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

client.on('ready', () => {
  console.log(`🥧 ${client.user.tag} is online`);
});


// test degisikligi
client.login(process.env.TOKEN);
