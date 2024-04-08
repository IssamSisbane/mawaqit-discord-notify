const { Client, GatewayIntentBits } = require('discord.js');
const { schedulePrayerMessages } = require('./communication.js');
var cron = require('node-cron');
require('dotenv').config();

const DISCORD_TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

// schedule scraper and message sending every day at 03:00
cron.schedule('0 3 * * *', async () => {
    const client = new Client({ intents: [
        GatewayIntentBits.GuildMessages,
    ], });

    client.once('ready', async () => {
        console.log('Bot is ready');
        await schedulePrayerMessages(client, CHANNEL_ID);
    });

    client.login(DISCORD_TOKEN);
});



