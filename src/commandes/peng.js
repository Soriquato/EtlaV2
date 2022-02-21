import etla from "../../index.js";

export const informations = {
    "name": "peng",
    "description": "Retourne un pongping",
    "type": 1
}

export async function execute(message){
    message.reply("pongping!");
    etla.logger.info("Replied with \"pongping\"")
}