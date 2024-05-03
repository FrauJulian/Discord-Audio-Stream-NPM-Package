import { StopProps } from "../stuff/types";
import { ERROR } from "../stuff/error";

const { getVoiceConnection } = require("@discordjs/voice");

export function StreamStop({
    igi,
}: StopProps) {
    try {

        const connection = getVoiceConnection(igi);
        connection.disconnect();
        
    } catch (error) {
        ERROR();
        console.log("ERR:\n" + error);
        console.log(" ");
    }
};