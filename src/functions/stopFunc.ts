const { getVoiceConnection } = require("@discordjs/voice");
import { ERR, stopParameter } from "../managers/UtilityManager";

export function stop({
    GuildID,
}: stopParameter) {
    try {
        const connection = getVoiceConnection(GuildID);
        connection.destroy();
    } catch (err) {
        ERR(err);
    }
};