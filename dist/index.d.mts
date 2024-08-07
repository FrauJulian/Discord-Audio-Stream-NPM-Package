type startParameters = {
    VoiceChannelID: number;
    GuildID: number;
    VoiceAdapter: number;
    Type: string;
    Resource: string;
};

type stopParameter = {
    GuildID: number;
};

type maxListenerParameter = {
    GuildID: number;
    MaxListeners: number;
};

declare function start({ VoiceChannelID, GuildID, VoiceAdapter, Type, Resource, }: startParameters): void;

declare function stop({ GuildID, }: stopParameter): void;

declare function setMaxListeners({ GuildID, MaxListeners, }: maxListenerParameter): void;

export { setMaxListeners, start, stop };
