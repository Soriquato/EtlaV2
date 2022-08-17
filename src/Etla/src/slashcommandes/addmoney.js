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

const response = {
    
}

export async function execute(interaction){
    try {
        let etlaUser = new EtlaUser(interaction.options[0].value)
        let userInfo = await etlaUser.getUserInfo()
        await etlaUser.addMoney(interaction.options[1].value)

    } catch(error){
        etla.logger.error(error)
    }
}