import axios from "axios"

const instance = axios.create({
    headers: {'Authorization': 'Bot Nzc1Mjk2OTc3MzAyNDU0MzAy.X6kRkw.ddOMN6g2ueFMy1QpdgVjZmWGgPU'}
})

export default class SlashCommandHandler {
    
    async getAllCurrentSlashCommands(){
        const response = await instance.get('https://discord.com/api/v9/applications/775296977302454302/commands')
        return response
    }
}