const { getVoiceConnection } = require("@discordjs/voice");
import { ERR, stopParameter } from "../managers/UtilityManager";

export function stop({
    igi,
}: stopParameter) {
    try {
        const connection = getVoiceConnection(igi);

        connection.destroy();
    } catch (err) {
        ERR();
    }
};