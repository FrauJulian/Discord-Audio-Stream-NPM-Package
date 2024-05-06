import { StartProps } from "../stuff/types";
import { ERROR } from "../stuff/error";

import { join } from "path";

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

        //Play function for file resource.
        function FileResource() {

            let Audio = createAudioResource(join(__dirname, Resource), { inlineVolume: true }); //Fetch stream File.
            AudioPlayer.play(Audio); //Set AudioPlayer to resource File.
    
            joinVoiceChannel({ //Join the channel.
              channelId: imvci,
              guildId: igi,
              adapterCreator: igv
            }).subscribe(AudioPlayer); //AudioPlayer start playing audio.
        }

        //Play function for link resource.
        function LinkResource() {
            let Audio = createAudioResource(Resource); //Fetch stream Link.
            AudioPlayer.play(Audio); //Set AudioPlayer to resource Link.

            joinVoiceChannel({ //Join the channel.
                channelId: imvci,
                guildId: igi,
                adapterCreator: igv
            }).subscribe(AudioPlayer) //AudioPlayer start playing audio.
        }

        //URL Pattern to test if the resource is a link.
        var URLPattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');

        if (type === "Link") { //If the type is "Link".

            if (URLPattern.test(Resource) === true) { //Check if Link is a URL.

                LinkResource(); //Run LinkResource function.

            } else { //If resource is not a link.
                ERROR(); //Run ERROR function.
                console.log("CODE: Resource isn't a Link!") //"Error Code" usefull for help people.
                console.log(" ") //Placeholder xD
            }

        } else if (type === "File") { //If the type is "File".
            if (Resource.startsWith("join(") == true) { //Check if the resource file exist.

                FileResource(); //Run FileResource function.

            } else { //If resource is not a file.
                ERROR(); //Run ERROR function.
                console.log("CODE: Resource isn't a File!") //"Error Code" usefull for help people.
                console.log(" ") //Placeholder xD
            }

        } else if (type === "Analyze") { //If the type is "Analyze".

            if (Resource.startsWith("join(") == true) { //Check if the resource file exist.

                FileResource(); //Run FileResource function.

            } else if (URLPattern.test(Resource) === true) { //Check if Link is a URL.

                LinkResource(); //Run LinkResource function.

            } else { //If resource is not a link or file.
                ERROR(); //Run ERROR function.
                console.log("CODE: Resource isn't a Link or a File!") //"Error Code" usefull for help people.
                console.log(" ") //Placeholder xD
            }

        } else { //If no valid value is specified.
            ERROR(); //Run ERROR function.
            console.log("CODE: Unknown resource type!") //"Error Code" usefull for help people.
            console.log(" ") //Placeholder xD
            return "Unknown";
        }

    } catch (error) { //If syntax is wrong.
        ERROR(); //Run ERROR function.
        console.log(">> ERR:\n" + error); //Log the Error 
        console.log(" "); //Placeholder xD
    }
};