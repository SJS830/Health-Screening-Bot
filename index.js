const { screenshot } = require('./browser.js');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  client.user.setActivity({
    type: "PLAYING",
    name: "with your mother"
  });
});

client.on('message', async message => {
  if (message.author.id === client.user.id) return;
  if (!message.content.startsWith('!ahs')) return;

  let name = message.content.split(' ').slice(1).join(' ');

  screenshot(name).then(() => {
    message.channel.send({
      content: `Here is your health screening, ${name}:`,
      files: ['./screenshot.png']
    });
  });
});


client.login(process.env.ahsbottoken)
