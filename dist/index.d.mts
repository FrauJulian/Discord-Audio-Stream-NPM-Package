type StartProps = {
    imvci: number;
    igi: number;
    igv: number;
    type: string;
    StreamFile?: string;
    StreamLink?: string;
};
type StopProps = {
    igi: number;
};

declare function StreamStart({ imvci, igi, igv, type, StreamFile, StreamLink }: StartProps): void;

declare function StreamStop({ igi, }: StopProps): void;

export { StreamStart, StreamStop };
