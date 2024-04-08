const { scrapeWebsite } = require('./scraper.js');

// Function to send a message in the specified channel
const sendMessage = async (client, message, channel_id) => {
    const channel = await client.channels.fetch(channel_id);
    channel.send(message);
    console.log('Message envoyé :', message);
};

// Function to plan the message for each prayer
const schedulePrayerMessages = async (client, channel_id) => {
    const prayers = await scrapeWebsite();
    console.log('Heures des prières récupérées :', prayers); 

    for (const [prayer, time] of Object.entries(prayers)) {
        const [hours, minutes] = time.split(':');
        const targetTime = new Date();
        targetTime.setHours(hours);
        targetTime.setMinutes(minutes);

        const currentTime = new Date();
        const delay = targetTime.getTime() - currentTime.getTime();

        // If the prayer time has already passed for today, skip it
        if (delay <= 0) {
            continue;
        }

        setTimeout(async () => {
            await sendMessage(client, `Il est l'heure de ${prayer}!`, channel_id);
        }, delay);
        console.log(`Message pour ${prayer} planifié pour ${targetTime}`);
    }
};


module.exports = { sendMessage, schedulePrayerMessages};