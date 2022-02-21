import Discord, { Intents } from 'discord.js';
import Logger from "../log/Logger.js";
import fs from 'fs'

export default class Etla extends Discord.Client {
    constructor(){
        super({
            intents: [Intents.FLAGS.GUILD_MESSAGES],
            allowedMentions: { parse: ['users'] },
        });
        this.logger = new Logger()
        this.commands = []
        this.events = []
        this.loadCommands()
        
        this.on('ready', () => {
            this.logger.info(`Logged in as ${this.user.tag}!`)
        })
        this.on('error', (error) => {
            this.logger.error(error.message)
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