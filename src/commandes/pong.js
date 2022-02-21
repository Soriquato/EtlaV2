export const informations = {
    "name": "pong",
    "description": "Retourne un ping",
    "type": 1
}

export async function execute(message){
    message.reply("Ping!");
    etla.logger.info("Replied with \"Ping\"")
}