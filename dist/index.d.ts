type startParameters = {
    imvci: number;
    igi: number;
    igv: number;
    type: string;
    Resource: string;
};

type stopParameter = {
    igi: number;
};

declare function start({ imvci, igi, igv, type, Resource, }: startParameters): void;

declare function stop({ igi, }: stopParameter): void;

export { start, stop };
