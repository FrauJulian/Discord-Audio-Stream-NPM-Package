export type StartProps = {
    imvci: number;
    igi: number;
    igv: number;
    type: string;
    StreamFile?: string;
    StreamLink?: string;
};

export type StopProps = {
    igi: number;
};