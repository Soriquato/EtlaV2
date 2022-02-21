import axios from "axios"
import etla from "../../index.js"
import fs from 'fs'
import Logger from "../log/Logger.js"

export default class SlashCommandHandler {
    constructor(){
        this.slashCommands = []
        this.commands = []
        const instance = axios.create({
            headers: {
                'Authorization': 'Bot Nzc1Mjk2OTc3MzAyNDU0MzAy.X6kRkw.ddOMN6g2ueFMy1QpdgVjZmWGgPU',
                'Content-Type': 'application/json'
            },
            baseURL: "https://discord.com/api/v9"
        })
        this.instance = instance
        this.logger = new Logger
    }

    sortSlashCommands(data){
        for(var i = 0;i<data.length;i++){
            this.slashCommands.push(data[i]['name'])
        }
    }

    async getAllCurrentSlashCommands(){
        const response = await this.instance.get('/applications/775296977302454302/commands')
        return response.data
    }

    postSlashCommand(data){
        thisinstance.post('/applications/775296977302454302/commands', data)
    }

    getAllEtlaCommands(){
        const commandFiles = fs.readdirSync('./src/commandes').filter(file => file.endsWith('.js'));
        for(const file of commandFiles) {
            this.commands.push(file.split('.')[0]);
        }
    }

    async checkSlashCommands(){
        let currentSlashCommands = await this.getAllCurrentSlashCommands()
        this.sortSlashCommands(currentSlashCommands)
        this.getAllEtlaCommands()
        for(var i = 0;i<this.commands.length;i++){
            if(!(this.slashCommands.includes(this.commands[i]))){
                this.logger.warn(`Nouvelle slash commandée detectée : ${this.commands[i]}`)
                let command = await import(`../commandes/${this.commands[i]}.js`)
                this.postSlashCommand(JSON.stringify(command.informations))
                this.logger.info(`Nouvelle slash commande ajoutée : ${this.commands[i]}`)
            }else{
                this.logger.info(`Slash commande ${this.commands[i]} chargée`)
            }
        }
    }
}