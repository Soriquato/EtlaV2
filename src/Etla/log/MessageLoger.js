import Discord from "discord.js"

export default class MessageLoger {
    successMessage(message) {
        let embed = new Discord.MessageEmbed()
        .setDescription(message)
        return embed
    }
    errorMessage(message){
        let embed = new Discord.MessageEmbed()
        console.log(message)
        .setDescription(message.message ?? message)
        return embed
    }
}