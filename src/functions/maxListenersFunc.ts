const { getVoiceConnection } = require("@discordjs/voice");
import { ERR, maxListenerParameter } from "../managers/UtilityManager";

export function setMaxListeners({
    GuildID,
    MaxListeners,
}: maxListenerParameter) {
    try {
        const connection = getVoiceConnection(GuildID);
        connection.setMaxListeners(MaxListeners);
    } catch (err) {
        ERR(err);
    }
};