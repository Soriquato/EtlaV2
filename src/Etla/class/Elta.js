import Discord, { Intents } from 'discord.js';
import Logger from "../log/Logger.js";
import fs from 'fs'
import MessageLoger from '../log/MessageLoger.js';
import SlashCommandHandler from '../api/SlashCommandHandler.js';

export class Etla extends Discord.Client {
    constructor (){
        super({
            intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS],
            allowedMentions: { parse: ['users'] },
        });
        this.logger = new Logger()
        this.messageLoger = new MessageLoger()
        this.SlashCommandHandler = new SlashCommandHandler()
        this.commands = []
        this.slashCommands = []
        this.events = []
        this.loadCommands()
        this.loadSlashCommands()
        
        this.on('ready', async () => {
            this.logger.info(`Logged in as ${this.user.tag}!`)
        })
        this.on('error', (error) => {
            this.logger.error(error.message)
        })
        this.on('messageCreate', async (message) => {
            this.checkCommand(message)
        })
        this.on('interactionCreate', async (interaction) => {
            const { commandName } = interaction;
            if(this.slashCommands.includes(commandName)){
                try {
                    let command = await import(`../src/slashcommandes/${commandName}.js`)
                    await command.execute(interaction)
                } catch (error) {
                    this.logger.error(error.message)
                    interaction.reply({embeds: [this.messageLoger.errorMessage(error.message)], ephemeral: true})
                }
            }
        })
    }

    loadCommands() {
        const commandFiles = fs.readdirSync('./src/Etla/src/commandes').filter(file => file.endsWith('.js'));
        for(const file of commandFiles) {
            this.commands.push(file.split('.')[0]);
            this.logger.info(`Commande ${file} chargée`);
        }
    }
    async loadSlashCommands(){
        this.slashCommands = await this.SlashCommandHandler.checkSlashCommands()
    }

    async checkCommand(message){
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
    }
}

const etla = (() => {
    const bot = new Etla();
    bot.login("Nzc1Mjk2OTc3MzAyNDU0MzAy.X6kRkw.ddOMN6g2ueFMy1QpdgVjZmWGgPU").catch((error) => bot.logger.error(error.message));
    return bot;
  })();
export default etla;