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
  setMaxListeners: () => setMaxListeners,
  start: () => start,
  stop: () => stop
});
module.exports = __toCommonJS(src_exports);

// src/utility/errorFunc.ts
function ERR(err) {
  console.error(" ");
  console.error("  ______ _____  _____   ____  _____  \r\n |  ____|  __ \\|  __ \\ / __ \\|  __ \\ \r\n | |__  | |__) | |__) | |  | | |__) |\r\n |  __| |  _  /|  _  /| |  | |  _  / \r\n | |____| | \\ \\| | \\ \\| |__| | | \\ \\ \r\n |______|_|  \\_\\_|  \\_\\\\____/|_|  \\_\\");
  console.error(" ");
  console.error("This error comes from the discord-audio-stream package!");
  console.error("This error occurs if you are not using the package correctly, sometimes it can also be bugs in the package.");
  console.error(" ");
  console.error("See the docs or open a issue post on github.");
  console.error(" ");
  if (err) {
    console.error(err);
  }
}

// src/functions/startFunc.ts
var import_node_path = require("path");
var { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
function start({
  VoiceChannelID,
  GuildID,
  VoiceAdapter,
  Type,
  Resource
}) {
  try {
    let streamFile2 = function(FILE) {
      let Audio = createAudioResource((0, import_node_path.join)(__dirname, FILE), { inlineVolume: true });
      AudioPlayer.play(Audio);
      joinVoiceChannel({
        channelId: VoiceChannelID,
        guildId: GuildID,
        adapterCreator: VoiceAdapter
      }).subscribe(AudioPlayer);
    }, streamLink2 = function(URL) {
      let Audio = createAudioResource(URL);
      AudioPlayer.play(Audio);
      joinVoiceChannel({
        channelId: VoiceChannelID,
        guildId: GuildID,
        adapterCreator: VoiceAdapter
      }).subscribe(AudioPlayer);
    }, LinkValidation2 = function(URL) {
      var URLPattern = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
      return URLPattern.test(URL);
    }, FileValidation2 = function(FILE) {
      var FILEPattern = new RegExp("^(.+)/([^/]+)$");
      return FILEPattern.test(FILE);
    };
    var streamFile = streamFile2, streamLink = streamLink2, LinkValidation = LinkValidation2, FileValidation = FileValidation2;
    const AudioPlayer = createAudioPlayer();
    switch (Type) {
      case "Link":
        streamLink2(Resource);
        break;
      case "File":
        streamFile2(Resource);
        break;
      case "Analyze":
        if (LinkValidation2(Resource)) {
          streamLink2(Resource);
        } else if (FileValidation2(Resource)) {
          streamFile2(Resource);
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
}

// src/functions/stopFunc.ts
var { getVoiceConnection } = require("@discordjs/voice");
function stop({
  GuildID
}) {
  try {
    const connection = getVoiceConnection(GuildID);
    connection.destroy();
  } catch (err) {
    ERR(err);
  }
}

// src/functions/maxListenersFunc.ts
var { getVoiceConnection: getVoiceConnection2 } = require("@discordjs/voice");
function setMaxListeners({
  GuildID,
  MaxListeners
}) {
  try {
    const connection = getVoiceConnection2(GuildID);
    connection.setMaxListeners(MaxListeners);
  } catch (err) {
    ERR(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setMaxListeners,
  start,
  stop
});
