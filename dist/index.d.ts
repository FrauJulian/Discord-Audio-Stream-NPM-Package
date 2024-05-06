type StartProps = {
    imvci: number;
    igi: number;
    igv: number;
    type: string;
    Resource: string;
};
type StopProps = {
    igi: number;
};

declare function StreamStart({ imvci, igi, igv, type, Resource, }: StartProps): "Unknown" | undefined;

declare function StreamStop({ igi, }: StopProps): void;

export { StreamStart, StreamStop };
