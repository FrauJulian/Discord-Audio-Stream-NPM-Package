export class AudioManagerError extends Error {
    public constructor(message: string, options?: ErrorOptions) {
        super(message, options);
        this.name = new.target.name;
    }
}

export class AudioManagerConfigError extends AudioManagerError {}

export class AudioManagerStateError extends AudioManagerError {}

export class FfmpegProcessError extends AudioManagerError {
    public constructor(message: string, cause?: unknown) {
        super(message, cause === undefined ? undefined : { cause });
    }
}
