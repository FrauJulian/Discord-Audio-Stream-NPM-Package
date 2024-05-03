import { StartProps } from "../stuff/types";
import { ERROR } from "../stuff/error";

const { joinVoiceChannel,  createAudioPlayer,  createAudioResource } = require("@discordjs/voice");
const { join } = require('node:path');

export function StreamStart({
    imvci,
    igi,
    igv,
    type,
    StreamFile,
    StreamLink
}: StartProps) {
    try {
        const AudioPlayer = createAudioPlayer();

        if (type === "File") {

            let Audio = createAudioResource(StreamLink);
            AudioPlayer.play(Audio);

            joinVoiceChannel({
                channelId: imvci,
                guildId: igi,
                adapterCreator: igv
            }).subscribe(AudioPlayer)

        } else if (type === "Link") {

            const Audio = createAudioResource(join(__dirname, StreamFile));
            AudioPlayer.play(Audio);
    
            joinVoiceChannel({
              channelId: imvci,
              guildId: igi,
              adapterCreator: igv
            }).subscribe(AudioPlayer);  
             
        } else {
            ERROR();
        }
    } catch (error) {
        ERROR();
        console.log("ERR:\n" + error);
        console.log(" ");
    }
};