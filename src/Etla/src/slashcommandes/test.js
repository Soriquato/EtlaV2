import etla from "../../class/Elta.js"

export async function execute(message){
    message.reply("Pong!");
    etla.logger.info("Replied with \"Pong\"")
}