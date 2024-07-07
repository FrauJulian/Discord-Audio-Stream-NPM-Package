const { joinVoiceChannel,  createAudioPlayer,  createAudioResource } = require("@discordjs/voice");
import { ERR, startParameters } from "../managers/UtilityManager";

import { join } from "node:path";

export function start({
    imvci,
    igi,
    igv,
    type,
    Resource,
}: startParameters) {
    try {
        const AudioPlayer = createAudioPlayer();

        function streamFile(FILE: string) {
            let Audio = createAudioResource(join(__dirname, FILE), { inlineVolume: true });
            AudioPlayer.play(Audio);
    
            joinVoiceChannel({
              channelId: imvci,
              guildId: igi,
              adapterCreator: igv
            }).subscribe(AudioPlayer);
        }

        function streamLink(URL: string) {
            let Audio = createAudioResource(URL);
            AudioPlayer.play(Audio); 

            joinVoiceChannel({ 
                channelId: imvci,
                guildId: igi,
                adapterCreator: igv
            }).subscribe(AudioPlayer)
        }

        function LinkValidation(URL: string) {
            var URLPattern = new RegExp('^(https?:\\/\\/)?'+
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
                '((\\d{1,3}\\.){3}\\d{1,3}))'+
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
                '(\\?[;&a-z\\d%_.~+=-]*)?'+
                '(\\#[-a-z\\d_]*)?$','i');

            return URLPattern.test(URL);
        }

        function FileValidation(FILE: string) {
            var FILEPattern = new RegExp("^(.+)\/([^\/]+)$");

            return FILEPattern.test(FILE);
        }

        switch (type) {
            case "Link":
                if(LinkValidation(Resource) === true && FileValidation(Resource) === false) {
                    streamLink(Resource);
                } else {
                    ERR();
                }
                break; 
            case "File":
                if(LinkValidation(Resource) === false && FileValidation(Resource) === true) {
                    streamFile(Resource);
                } else {
                    ERR();
                }
                break;
            case "Analyze":
                if(LinkValidation(Resource) === true && FileValidation(Resource) === false) {
                    streamLink(Resource);
                } else if(LinkValidation(Resource) === false && FileValidation(Resource) === true) {
                    streamFile(Resource)
                } else {
                    ERR();
                }
                break;
            default: 
                ERR();
                break;
        }
    } catch (err) {
        ERR(err);
    }
};