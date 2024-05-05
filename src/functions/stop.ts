import { StopProps } from "../stuff/types";
import { ERROR } from "../stuff/error";

const { getVoiceConnection } = require("@discordjs/voice");

export function StreamStop({
    igi,
}: StopProps) {
    try {
        //Get connection from interaction guild.
        const connection = getVoiceConnection(igi);

        //Destroy connection from interaction guild.
        connection.destroy();
        
    } catch (error) {
        ERROR(); //Run ERROR function.
        console.log(">> ERR:\n" + error); //Log the Error 
        console.log(" "); //Placeholder xD
    }
};