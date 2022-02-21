import etla from "../../index.js";

export const informations = {
    "name": "ping",
    "description": "Retourne un ping",
    "type": 1
}

export async function execute(message){
    message.reply("Pong!");
    etla.logger.info("Replied with \"Pong\"")
}