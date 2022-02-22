import etla from "../../index.js";

export const informations = {
    "name": "ping",
    "description": "Retourne un ping",
    "type": 1
}

export async function execute(interaction){
    interaction.reply({content: "Pong!", ephemeral: true});
    etla.logger.info("Replied with \"Pong\"")
}