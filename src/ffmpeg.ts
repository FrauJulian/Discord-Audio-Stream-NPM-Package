import { spawn } from 'node:child_process';
import type { ChildProcessByStdio } from 'node:child_process';
import { createRequire } from 'node:module';
import type { Readable } from 'node:stream';

import { AudioManagerConfigError, FfmpegProcessError } from './errors';
import type { FfmpegOptions } from './types';

const requireFromCurrentModule = createRequire(__filename);

const DEFAULT_INPUT_ARGS = ['-hide_banner', '-loglevel', 'error', '-nostdin'] as const;
const DEFAULT_OUTPUT_ARGS = ['-vn', '-f', 's16le', '-ar', '48000', '-ac', '2', 'pipe:1'] as const;
const FORCE_KILL_TIMEOUT_MS = 2_000;
const STDERR_TAIL_BYTES = 4_096;

export type FfmpegProcessHandle = {
    readonly process: ChildProcessByStdio<null, Readable, Readable>;
    readonly ready: Promise<void>;
    stop(): void;
};

export function resolveFfmpegExecutable(options: FfmpegOptions = {}): string {
    if (options.executablePath?.trim()) {
        return options.executablePath;
    }

    if ((options.mode ?? 'native') === 'native') {
        return 'ffmpeg';
    }

    try {
        const executable = requireFromCurrentModule('ffmpeg-static') as unknown;

        if (typeof executable === 'string' && executable.length > 0) {
            return executable;
        }
    } catch (error) {
        throw new AudioManagerConfigError(
            'Unable to resolve ffmpeg-static. Install it or pass ffmpeg.executablePath.',
            { cause: error },
        );
    }

    throw new AudioManagerConfigError('ffmpeg-static did not expose an executable path.');
}

export function startFfmpeg(input: string, options: FfmpegOptions = {}): FfmpegProcessHandle {
    const executable = resolveFfmpegExecutable(options);
    const args = [
        ...(options.inputArgs ?? DEFAULT_INPUT_ARGS),
        '-i',
        input,
        ...(options.outputArgs ?? DEFAULT_OUTPUT_ARGS),
    ];
    const childProcess = spawn(executable, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    const abortController = new AbortController();
    const ready = waitForFfmpegOutput(childProcess, abortController.signal);

    childProcess.stderr.resume();

    return {
        process: childProcess,
        ready,
        stop: (): void => {
            stopProcess(childProcess, abortController);
        },
    };
}

function waitForFfmpegOutput(
    childProcess: ChildProcessByStdio<null, Readable, Readable>,
    signal: AbortSignal,
): Promise<void> {
    const { promise, resolve, reject } = Promise.withResolvers<void>();
    let stderrTail = '';
    let settled = false;

    const appendStderr = (chunk: Buffer | string): void => {
        stderrTail = (stderrTail + String(chunk)).slice(-STDERR_TAIL_BYTES);
    };

    const cleanup = (): void => {
        childProcess.off('exit', onExit);
        childProcess.stdout.off('readable', onReadable);
        childProcess.stderr.off('data', appendStderr);
        signal.removeEventListener('abort', onAbort);
    };

    const settle = (complete: () => void): void => {
        if (settled) {
            return;
        }

        settled = true;
        cleanup();
        complete();
    };

    const fail = (message: string, cause?: unknown): void => {
        settle(() => reject(new FfmpegProcessError(addStderrTail(message, stderrTail), cause)));
    };

    const onError = (error: Error): void => {
        if (!settled) {
            fail(`Unable to start ffmpeg. Cause: ${error.message}`, error);
        }
    };

    const onExit = (code: number | null, exitSignal: NodeJS.Signals | null): void => {
        fail(`ffmpeg exited before producing audio. Exit code: ${code ?? 'none'}, signal: ${exitSignal ?? 'none'}.`);
    };

    const onReadable = (): void => {
        settle(() => resolve());
    };

    const onAbort = (): void => {
        const reason: unknown = signal.reason;
        settle(() =>
            reject(
                reason instanceof Error
                    ? reason
                    : new FfmpegProcessError('ffmpeg was stopped before producing audio.', reason),
            ),
        );
    };

    childProcess.stderr.on('data', appendStderr);
    childProcess.on('error', onError);
    childProcess.once('exit', onExit);
    childProcess.stdout.once('readable', onReadable);
    signal.addEventListener('abort', onAbort, { once: true });

    return promise;
}

function addStderrTail(message: string, stderrTail: string): string {
    const trimmedTail = stderrTail.trim();

    return trimmedTail ? `${message} stderr: ${trimmedTail}` : message;
}

function stopProcess(
    childProcess: ChildProcessByStdio<null, Readable, Readable>,
    abortController: AbortController,
): void {
    if (abortController.signal.aborted) {
        return;
    }

    abortController.abort(new FfmpegProcessError('ffmpeg was stopped before producing audio.'));
    childProcess.stdout.destroy();
    childProcess.stderr.destroy();

    if (childProcess.exitCode !== null || childProcess.signalCode !== null) {
        return;
    }

    childProcess.kill('SIGTERM');

    const forceKillTimeout = setTimeout(() => {
        if (childProcess.exitCode === null && childProcess.signalCode === null) {
            childProcess.kill('SIGKILL');
        }
    }, FORCE_KILL_TIMEOUT_MS);

    childProcess.once('close', () => clearTimeout(forceKillTimeout));
    forceKillTimeout.unref();
}
