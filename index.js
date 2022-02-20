import Discord from 'discord.js';
import Logger from './src/log/Logger.js';
import MessageLoger from './src/log/MessageLoger.js';
import fs from 'fs';

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES], partials: ['REACTION', 'MESSAGE', 'CHANNEL', 'USER', 'GUILD_MEMBER', 'CHANNEL']});
const logger = new Logger();
const messageloger = new MessageLoger()
const commandFiles = fs.readdirSync('./src/commandes').filter(file => file.endsWith('.js'));
client.commands = [];

for(const file of commandFiles) {
    client.commands.push(file.split('.')[0]);
    logger.info(`Commande ${file} chargée`);
}

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
})

client.on('error', (error) => {
    logger.error(error);
})

client.on('messageCreate', async (message) => {
    if(message.content === "!ping") {
        try {
            let command = await import(`./src/commandes/ping.js`);
            await command.execute(message);
        } catch (error) {
            logger.error(error.message);
            message.reply({embeds: [messageloger.errorMessage(error.message)]})
        }
    }
})

client.login("Nzc1Mjk2OTc3MzAyNDU0MzAy.X6kRkw.ddOMN6g2ueFMy1QpdgVjZmWGgPU")