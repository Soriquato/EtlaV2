import fetch from "node-fetch"
import etla from "../class/Elta.js"
import fs from 'fs'

export default class SlashCommandHandler {
    constructor(){
        this.slashCommands = []
        this.commands = []
        this.headers =  {
            'Authorization': `Bot ${process.env.TOKEN}`,
            'Content-Type': 'application/json'
        }
    }

    sortSlashCommands(data){
        for(var i = 0;i<data.length;i++){
            this.slashCommands.push(data[i]['name'])
        }
    }

    async getAllCurrentSlashCommands(){
        const response = await fetch(`https://discord.com/api/v9/applications/775296977302454302/commands`, {
            method: 'get',
            headers: this.headers
        })
        return response.json()
    }

    async postSlashCommand(data){
        await fetch(`https://discord.com/api/v9/applications/775296977302454302/commands`, {
            method: "post",
            body: data,
            headers: this.headers
        })
    }

    async deleteSlashCommand(commandId){
        try {
            await fetch(`/applications/775296977302454302/commands/${commandId}`, {
                method: 'delete',
                headers: this.headers
            })
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