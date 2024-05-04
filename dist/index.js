"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var import_fs = __toESM(require("fs"));
var import_node_path = require("path");
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
      let Audio = createAudioResource((0, import_node_path.join)(__dirname, Resource), { inlineVolume: true });
      AudioPlayer.play(Audio);
      joinVoiceChannel({
        channelId: imvci,
        guildId: igi,
        adapterCreator: igv
      }).subscribe(AudioPlayer);
    }, LinkResource2 = function() {
      let Audio = createAudioResource(Resource);
      AudioPlayer.play(Audio);
      joinVoiceChannel({
        channelId: imvci,
        guildId: igi,
        adapterCreator: igv
      }).subscribe(AudioPlayer);
    };
    var FileResource = FileResource2, LinkResource = LinkResource2;
    const AudioPlayer = createAudioPlayer();
    if (type === "Link") {
      LinkResource2();
    } else if (type === "File") {
      FileResource2();
    } else if (type === "Analyze") {
      if (import_fs.default.existsSync(Resource)) {
        FileResource2();
      } else {
        LinkResource2();
      }
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
