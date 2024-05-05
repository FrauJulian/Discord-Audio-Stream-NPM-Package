var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

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
import { join } from "node:path";
var Source = "";
var { joinVoiceChannel, createAudioPlayer, createAudioResource } = __require("@discordjs/voice");
function StreamStart({
  imvci,
  igi,
  igv,
  type,
  Resource
}) {
  try {
    let FileResource2 = function() {
      let Audio = createAudioResource(join(__dirname, Source));
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
        const result = new Promise((resolve2, reject) => {
          resolve2("Play");
        });
      } else {
        ERROR();
        console.log("CODE: Resource isn't a Link!");
        console.log(" ");
        const result = new Promise((resolve2, reject) => {
          resolve2("Unknown");
        });
      }
    } else if (type === "File") {
      if (Resource.startsWith(".") == true) {
        Source = __require(Resource);
        FileResource2();
        const result = new Promise((resolve2, reject) => {
          resolve2("Play");
        });
      } else {
        ERROR();
        console.log("CODE: Resource isn't a File!");
        console.log(" ");
        const result = new Promise((resolve2, reject) => {
          resolve2("Unknown");
        });
      }
    } else if (type === "Analyze") {
      if (Resource.startsWith(".") == true) {
        Source = __require(Resource);
        FileResource2();
        const result = new Promise((resolve2, reject) => {
          resolve2("Play");
        });
      } else if (URLPattern.test(Resource) === true) {
        LinkResource2();
        const result = new Promise((resolve2, reject) => {
          resolve2("Play");
        });
      } else {
        ERROR();
        console.log("CODE: Resource isn't a Link or a File!");
        console.log(" ");
        const result = new Promise((resolve2, reject) => {
          resolve2("Unknown");
        });
      }
    } else {
      ERROR();
      console.log("CODE: Unknown resource type!");
      console.log(" ");
      const result = new Promise((resolve2, reject) => {
        resolve2("Unknown");
      });
    }
  } catch (error) {
    ERROR();
    console.log(">> ERR:\n" + error);
    console.log(" ");
    const result = new Promise((resolve2, reject) => {
      resolve2("ERROR");
    });
  }
}

// src/functions/stop.ts
var { getVoiceConnection } = __require("@discordjs/voice");
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
export {
  StreamStart,
  StreamStop
};
