"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  StreamStart: () => StreamStart,
  StreamStop: () => StreamStop
});
module.exports = __toCommonJS(src_exports);

// src/stuff/error.ts
function ERROR() {
  console.log(" ");
  console.error("  ______ _____  _____   ____  _____  \r\n |  ____|  __ \\|  __ \\ / __ \\|  __ \\ \r\n | |__  | |__) | |__) | |  | | |__) |\r\n |  __| |  _  /|  _  /| |  | |  _  / \r\n | |____| | \\ \\| | \\ \\| |__| | | \\ \\ \r\n |______|_|  \\_\\_|  \\_\\\\____/|_|  \\_\\");
  console.log(" ");
  console.log("This error comes from the discord-audio-stream package!");
  console.log("This error happens if you don't use the package right.");
  console.log(" ");
  console.log("See the docs or open a issue post on github.");
  console.log(" ");
}

// src/functions/start.ts
var import_path = require("path");
var { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
function StreamStart({
  imvci,
  igi,
  igv,
  type,
  Resource
}) {
  try {
    let FileResource2 = function() {
      let Audio = createAudioResource((0, import_path.join)(__dirname, Resource), { inlineVolume: true });
      AudioPlayer.play(Audio);
      joinVoiceChannel({
        //Join the channel.
        channelId: imvci,
        guildId: igi,
        adapterCreator: igv
      }).subscribe(AudioPlayer);
    }, LinkResource2 = function() {
      let Audio = createAudioResource(Resource);
      AudioPlayer.play(Audio);
      joinVoiceChannel({
        //Join the channel.
        channelId: imvci,
        guildId: igi,
        adapterCreator: igv
      }).subscribe(AudioPlayer);
    };
    var FileResource = FileResource2, LinkResource = LinkResource2;
    const AudioPlayer = createAudioPlayer();
    var URLPattern = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
    if (type === "Link") {
      if (URLPattern.test(Resource) === true) {
        LinkResource2();
      } else {
        ERROR();
        console.log("CODE: Resource isn't a Link!");
        console.log(" ");
      }
    } else if (type === "File") {
      if (Resource.startsWith("join(") == true) {
        FileResource2();
      } else {
        ERROR();
        console.log("CODE: Resource isn't a File!");
        console.log(" ");
      }
    } else if (type === "Analyze") {
      if (Resource.startsWith("join(") == true) {
        FileResource2();
      } else if (URLPattern.test(Resource) === true) {
        LinkResource2();
      } else {
        ERROR();
        console.log("CODE: Resource isn't a Link or a File!");
        console.log(" ");
      }
    } else {
      ERROR();
      console.log("CODE: Unknown resource type!");
      console.log(" ");
      return "Unknown";
    }
  } catch (error) {
    ERROR();
    console.log(">> ERR:\n" + error);
    console.log(" ");
  }
}

// src/functions/stop.ts
var { getVoiceConnection } = require("@discordjs/voice");
function StreamStop({
  igi
}) {
  try {
    const connection = getVoiceConnection(igi);
    connection.destroy();
  } catch (error) {
    ERROR();
    console.log(">> ERR:\n" + error);
    console.log(" ");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StreamStart,
  StreamStop
});
