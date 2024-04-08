const puppeteer = require('puppeteer');
require('dotenv').config();

const MAWAQIT_URL = process.env.MAWAQIT_URL;
const MOSQUEE_NAME = process.env.MOSQUEE_NAME;

// Function to scrape the website
// This function will be called by the server
// to scrape the website and return the data
// to the server
async function scrapeWebsite() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(MAWAQIT_URL+MOSQUEE_NAME,  { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
        
        // Get the prayer times
        let prayers = {};
        const prayerElements = document.querySelectorAll('div.name');
        prayerElements.forEach(element => {
            const prayerName = element.textContent.trim().toLowerCase();
            const prayerTime = element.nextElementSibling.textContent.trim();
            prayers[prayerName] = prayerTime;
        });

        // filter dict to keep only the 5 prayers
        prayers = Object.keys(prayers)
            .filter(key => ['fajr', 'chourouk', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(key))
            .reduce((obj, key) => {
                obj[key] = prayers[key];
                return obj;
            }, {});

        return prayers;
    });
    await browser.close();
    return data;
}

module.exports = { scrapeWebsite };