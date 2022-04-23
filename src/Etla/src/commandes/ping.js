import etla from "../../class/Elta.js"
import EtlaGuildMember from "../../class/EtlaGuildMember.js";

export const informations = {
    name: "ping",
    description: "Retourne un ping",
    type: 1
}

export async function execute(message){
    let GuildMember = new EtlaGuildMember(message.member)
    console.log(GuildMember.test())
    message.reply("Pong Pong!");
    etla.logger.info("Replied with \"Pong\"")
}