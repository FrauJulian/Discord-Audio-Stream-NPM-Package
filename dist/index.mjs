var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

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
import { join } from "node:path";
var { joinVoiceChannel, createAudioPlayer, createAudioResource } = __require("@discordjs/voice");
function start({
  imvci,
  igi,
  igv,
  type,
  Resource
}) {
  try {
    let streamFile2 = function(FILE) {
      let Audio = createAudioResource(join(__dirname, FILE), { inlineVolume: true });
      AudioPlayer.play(Audio);
      joinVoiceChannel({
        channelId: imvci,
        guildId: igi,
        adapterCreator: igv
      }).subscribe(AudioPlayer);
    }, streamLink2 = function(URL) {
      let Audio = createAudioResource(URL);
      AudioPlayer.play(Audio);
      joinVoiceChannel({
        channelId: imvci,
        guildId: igi,
        adapterCreator: igv
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
    switch (type) {
      case "Link":
        if (LinkValidation2(Resource) === true && FileValidation2(Resource) === false) {
          streamLink2(Resource);
        } else {
          ERR();
        }
        break;
      case "File":
        if (LinkValidation2(Resource) === false && FileValidation2(Resource) === true) {
          streamFile2(Resource);
        } else {
          ERR();
        }
        break;
      case "Analyze":
        if (LinkValidation2(Resource) === true && FileValidation2(Resource) === false) {
          streamLink2(Resource);
        } else if (LinkValidation2(Resource) === false && FileValidation2(Resource) === true) {
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
var { getVoiceConnection } = __require("@discordjs/voice");
function stop({
  igi
}) {
  try {
    const connection = getVoiceConnection(igi);
    connection.destroy();
  } catch (err) {
    ERR();
  }
}
export {
  start,
  stop
};
