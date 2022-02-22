import axios from "axios"
import etla from "../class/Elta.js"
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

    async postSlashCommand(data){
        await this.instance.post('/applications/775296977302454302/commands', data)
    }

    async deleteSlashCommand(commandId){
        try {
            await this.instance.delete(`/applications/775296977302454302/commands/${commandId}`)
        } catch (error) {
            etla.logger.error(error.message)
        }
    }

    getAllEtlaCommands(){
        const commandFiles = fs.readdirSync('./src/Etla/src/slashcommandes').filter(file => file.endsWith('.js'));
        for(const file of commandFiles) {
            this.commands.push(file.split('.')[0]);
        }
    }

    async checkSlashCommands(){
        let TotalSlashCommands = []
        let currentSlashCommands = await this.getAllCurrentSlashCommands()
        this.sortSlashCommands(currentSlashCommands)
        this.getAllEtlaCommands()
        for(var i = 0;i<this.commands.length;i++){
            try {
                if(!(this.slashCommands.includes(this.commands[i]))){
                    etla.logger.warn(`Nouvelle slash commandée detectée : ${this.commands[i]}`)
                    let command = await import(`../src/slashcommandes/${this.commands[i]}.js`)
                    try {
                        await this.postSlashCommand(JSON.stringify(command.informations))
                        etla.logger.info(`Nouvelle slash commande ajoutée : ${this.commands[i]}`)
                        etla.logger.info(`Slash commande ${this.commands[i]}.js chargée`)
                        TotalSlashCommands.push(this.commands[i])
                    } catch (error) {
                        etla.logger.error(error.message)
                    }
                }else{
                    etla.logger.info(`Slash commande ${this.commands[i]}.js chargée`)
                    TotalSlashCommands.push(this.commands[i])
                }
            } catch (error) {
                etla.logger.error(error.message)
            }
        }
        return TotalSlashCommands
    }
}