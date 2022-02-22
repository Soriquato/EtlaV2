import etla from "../../class/Elta.js"

export const informations = {
    name: "ping",
    description: "Retourne un ping",
    type: 1
}

export async function execute(message){
    message.reply("Pong Pong!");
    etla.logger.info("Replied with \"Pong\"")
}