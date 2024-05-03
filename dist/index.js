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
  console.log("  ______ _____  _____   ____  _____  \r\n |  ____|  __ \\|  __ \\ / __ \\|  __ \\ \r\n | |__  | |__) | |__) | |  | | |__) |\r\n |  __| |  _  /|  _  /| |  | |  _  / \r\n | |____| | \\ \\| | \\ \\| |__| | | \\ \\ \r\n |______|_|  \\_\\_|  \\_\\\\____/|_|  \\_\\");
  console.log(" ");
  console.log("This error comes from the discord-audio-stream package!");
  console.log("This error happens if you don't use the package right.");
  console.log(" ");
  console.log("See the docs or open a issue post on github.");
  console.log(" ");
}

// src/functions/start.ts
var { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
var { join } = require("path");
function StreamStart({
  imvci,
  igi,
  igv,
  type,
  StreamFile,
  StreamLink
}) {
  try {
    const AudioPlayer = createAudioPlayer();
    if (type === "File") {
      let Audio = createAudioResource(StreamLink);
      AudioPlayer.play(Audio);
      joinVoiceChannel({
        channelId: imvci,
        guildId: igi,
        adapterCreator: igv
      }).subscribe(AudioPlayer);
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
}

// src/functions/stop.ts
var { getVoiceConnection } = require("@discordjs/voice");
function StreamStop({
  igi
}) {
  try {
    const connection = getVoiceConnection(igi);
    connection.disconnect();
  } catch (error) {
    ERROR();
    console.log("ERR:\n" + error);
    console.log(" ");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StreamStart,
  StreamStop
});
