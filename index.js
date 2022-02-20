import Discord from 'discord.js';
import Logger from './src/log/Logger.js';

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const logger = new Logger();

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
})

client.login("Nzc1Mjk2OTc3MzAyNDU0MzAy.X6kRkw.ddOMN6g2ueFMy1QpdgVjZmWGgPU")