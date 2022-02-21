import Discord, { Intents } from 'discord.js';
import Logger from "../log/Logger.js";
import fs from 'fs'
import MessageLoger from '../log/MessageLoger.js';

export default class Etla extends Discord.Client {
    constructor(){
        super({
            intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS],
            allowedMentions: { parse: ['users'] },
        });
        this.logger = new Logger()
        this.messageLoger = new MessageLoger()
        this.commands = []
        this.events = []
        this.loadCommands()
        
        this.on('ready', () => {
            this.logger.info(`Logged in as ${this.user.tag}!`)
        })
        this.on('error', (error) => {
            this.logger.error(error.message)
        })
        this.on('messageCreate', async (message) => {
            let messageArray = message.content.split(" "); 
            let prefix = "!"
            if(messageArray[0][0] === prefix){
                let cmd = messageArray[0].slice(1);
                let args = message.content.slice(0).split(' '); 
                if(this.commands.includes(cmd)) {
                    try {
                        let command = await import(`../commandes/${cmd}.js`);
                        await command.execute(message, ...args);
                    } catch (error) {
                        this.logger.error(error.message);
                        message.reply({embeds: [this.messageLoger.errorMessage(error.message)]})
                    }
                }
            } 
        })
    }

    loadCommands() {
        const commandFiles = fs.readdirSync('./src/commandes').filter(file => file.endsWith('.js'));
        for(const file of commandFiles) {
            this.commands.push(file.split('.')[0]);
            this.logger.info(`Commande ${file} chargée`);
        }
    }
}