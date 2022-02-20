import Discord from 'discord.js';
import Logger from './src/log/Logger.js';
import fs from 'fs';

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const logger = new Logger();
const commandFiles = fs.readdirSync('./src/commandes').filter(file => file.endsWith('.js'));
client.commands = [];

for(const file of commandFiles) {
    client.commands.push(file.split('.')[0]);
    logger.info(`Commande ${file} chargée`);
}

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
    console.log(client.commands)
})

client.on('error', (error) => {
    logger.error(error);
})

client.on('message', async message => {
    if(message.content === ".ping") {
        const command = client.commands.get("ping");
        try {
            await command.execute(message);
        } catch (error) {
            logger.error(error.message);
        }
    }
})

client.login("Nzc1Mjk2OTc3MzAyNDU0MzAy.X6kRkw.ddOMN6g2ueFMy1QpdgVjZmWGgPU")