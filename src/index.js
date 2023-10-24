require('dotenv').config();

const{ Client, IntentsBitField} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

//Music
const { YTSearcher } = require('ytsearcher');
const ytdl = require('ytdl-core-discord');
const ytApiKey = 'AIzaSyCa0uZ7hAoDmf7EWzZkvRacPVE4YHdZP-8';
const searcher = new YTSearcher(ytApiKey);

client.on('ready', () => {
  console.log(`🥧 ${client.user.tag} is online`);
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!play')) {
    const query = message.content.slice(6);
    const video = await searcher.search(query);

    if (video && video.videos.length > 0) {
      const connection = await message.member.voice.channel.join();
      const stream = ytdl(video.videos[0].url, { filter: 'audioonly' });
      const dispatcher = connection.play(stream);

      dispatcher.on('finish', () => {
        connection.disconnect();
      });
    } else {
      message.channel.send('Video not found!');
    }
  }
});

client.login(process.env.TOKEN);
