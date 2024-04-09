# Mawaqit Discord Notification BOT

Mawaqit DNB is a Node.js project. Its purpose is to scrape data from the MAWAQIT website to retrieve prayer times and send notifications to a specific Discord channel at the time of each of the five obligatory prayers in Islam.

Learn more about this project [here.](https://issamsisbane.github.io/portfolio/en/projects/mawaqit-discord-notify/)

## Usage

To launch the program, simply add the environment variables in the `.env` file corresponding to the desired Discord channel as well as the credentials of your Discord bot (which you will need to create beforehand). Then, just run index.js and everything is done automatically while letting the program run.

## Deployment

For deployment, simply use the Dockerfile which is ready for use, remembering to specify the environment variables that are necessary for the proper functioning of the project.

## Dependencies

- `discord.js`: A popular library for interacting with the Discord API.
- `dotenv`: Used to load environment variables from a `.env` file.
- `node-cron`: Used to schedule tasks to be executed at regular intervals.
- `puppeteer`: Used for web scraping.
