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
```bash
npm i discord-audio-stream
```

or

```bash
yarn add discord-audio-stream
```

### Code Snippet - Start
```js
const AudioStream = require("discord-audio-stream");

AudioStream.start({
    VoiceChannelID: 0, //Integer | Voice Channel ID | e.g interaction.member.voice.channel.id
    GuildID: 0, //Integer | Guild ID | e.g interaction.guild.id
    VoiceAdapter: 0, //Integer | Voice Adapter Creator | e.g interaction.guild.voiceAdapterCreator
    Type: "", //String | choose the Audio Resource [File or Link or Analyze] | Analyze
    Resource: "", //String | Audio Stream Link or File Location | e.g https://synradiode.stream.laut.fm/synradiode
})
```

### Code Snippet - Stop
```js
const AudioStream = require("discord-audio-stream");

AudioStream.stop({
    GuildID: 0, //Integer | Guild ID | e.g interaction.guild.id
})
```

### Code Snippet - Set Max Listeners
```js
const AudioStream = require("discord-audio-stream");

AudioStream.setMaxListeners({
    GuildID: 0, //Integer | Guild ID | e.g interaction.guild.id
    MaxListeners: 0, //Integer | max Listeners | e.g 30
})
```

## 🤝 Enjoy the package?

Give it a star ⭐ on [github](https://github.com/FrauJulian/discord-audio-stream) or [buy](https://buymeacoffee.com/fraujuliannn) a hot chocolate!