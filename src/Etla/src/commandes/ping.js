import etla from "../../class/Elta.js"
import EtlaGuildMember from "../../class/EtlaGuildMember.js";

export const informations = {
    name: "ping",
    description: "Retourne un ping",
    type: 1
}

export async function execute(message){
    let GuildMember = await new EtlaGuildMember(message.author.id)
    GuildMember.addMoney(20)
    message.reply("Pong Pong!");
    etla.logger.info("Replied with \"Pong\"")
}