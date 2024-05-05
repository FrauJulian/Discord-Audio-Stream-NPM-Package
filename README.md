# Discord Audio Stream

[![npm](https://img.shields.io/npm/dw/discord-audio-stream)](http://npmjs.org/package/discord-audio-stream)
![GitHub package.json version](https://img.shields.io/github/package-json/v/FrauJulian/discord-audio-stream)
![GitHub Repo stars](https://img.shields.io/github/stars/FrauJulian/discord-audio-stream?style=social)

<p>This NPM package was created to make it easier to stream audio to Discord.</p>
<p>There is a security feature of discord that stops the stream of audio after some time. This problem can be solved by disconnecting the Discord channel every 1.5 hours for 2 seconds and then reconnecting the channel. (If you use this package!) I recommend using a database to store the data e.g. MySQL, SQLite, json file and other database types.</p>
<p>The package does not fix this error yet. However, it is currently being worked on!</p>

**This module is designed to work with [discord.js](https://discord.js.org/#/) v14. This package doesn't support older versions!**

## 👋 Support

Pease create a bug post on github or write [`fraujulian`](https://discord.com/users/860206216893693973) on discord!

## 📝 Usage

### Install package
```
npm i discord-audio-stream
```

or

```
yarn add discord-audio-stream
```

### Code Snippet - Start
```js
const Audio = require("discord-audio-stream");

Audio.StreamStart({
    imvci: 0, //Voice Channel ID e.g. interaction.member.voice.channel.id
    igi: 0, //Guild ID e.g. interaction.guild.id
    igv: 0, //Bot Voice Adapter e.g. interaction.guild.voiceAdapterCreator
    type: "", //Choose the Stream resource - File or Link or Analyze
    Resource: "", //Link to File e.g. ../assets/Stream.mp3 or Link to Audio Stream e.g. YouTube Video or LautFM Stream Link
})
```

### Code Snippet - Stop
```js
const Audio = require("discord-audio-stream");

Audio.StreamStart({
    igi: 0, //Guild ID e.g. interaction.guild.id
})
```

## 🤝 Enjoy the package?

Give it a star ⭐ on [github](https://github.com/FrauJulian/discord-audio-stream) or [donate](https://buymeacoffee.com/fraujuliannn) a hot chocolate!