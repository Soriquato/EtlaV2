import etla from "../../class/Elta.js"

export async function execute(interaction){
    interaction.reply("Pong!");
    etla.logger.info("Replied with \"Pong\"")
}