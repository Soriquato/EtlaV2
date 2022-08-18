import etla from "../../class/Elta.js"
import EtlaUser from "../../class/EtlaGuildMember.js"
import prisma from "../../db/prisma.js"

export const informations = {
    name: "addmoney",
    description: "Ajoute de l'argent a un utilisateur",
    type: 1,
    options: [
        {
            name: "utilisateur",
            description: "Le pseudo de l'utilisateur",
            type: 6,
            required: true
        },
        {
            name: "quantité",
            description: "La quantité d'argent a ajouter a l'utilisateur",
            type: 4,
            required: true
        }
    ]
}

export async function execute(interaction){
    try {
        let etlaUser = new EtlaUser(interaction.options.getUser('utilisateur').id)
        await etlaUser.addMoney(interaction.options.getInteger("quantité"))
        await interaction.reply({content: "Test"})
    } catch(error){
        etla.logger.error(error)
    }
}