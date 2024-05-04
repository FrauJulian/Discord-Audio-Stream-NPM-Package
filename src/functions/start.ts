import { StartProps } from "../stuff/types";
import { ERROR } from "../stuff/error";
import fs from "fs";
import { join } from "node:path";
import { AudioPlayer } from "@discordjs/voice";

const { joinVoiceChannel,  createAudioPlayer,  createAudioResource } = require("@discordjs/voice");

export function StreamStart({
    imvci,
    igi,
    igv,
    type,
    Resource,
}: StartProps) {
    try {
        //Create AudioPlayer variable.
        const AudioPlayer = createAudioPlayer();

        //File Resource
        function FileResource() {
            
            let Audio = createAudioResource(join(__dirname, Resource), { inlineVolume: true });
            AudioPlayer.play(Audio);
    
            joinVoiceChannel({
              channelId: imvci,
              guildId: igi,
              adapterCreator: igv
            }).subscribe(AudioPlayer);  
        }

        //Link Resource
        function LinkResource() {
            let Audio = createAudioResource(Resource);
            AudioPlayer.play(Audio);

            joinVoiceChannel({
                channelId: imvci,
                guildId: igi,
                adapterCreator: igv
            }).subscribe(AudioPlayer)
        }

        //If the type is "Link".
        if (type === "Link") {
            LinkResource();
        //If the type is "File".
        } else if (type === "File") {
            FileResource();
        //If the type is "Analyze".
        } else if (type === "Analyze") {
            if (fs.existsSync(Resource)) { //Check if Resource is a file and exist.
                FileResource();
            } else { //If Resoure is not a file or doesn't exist.
                LinkResource();
            }
        } else {
            //If no valid value is specified.
            ERROR();
        }
    } catch (error) {
        //If syntax is wrong.
        ERROR();
        console.log("ERR:\n" + error);
        console.log(" ");
    }
};