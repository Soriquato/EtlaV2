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
        let addedMoney = interaction.options.getInteger("quantité")
        await etlaUser.addMoney(addedMoney).then(user => {
            await interaction.reply({content: `<@${user.id}> a désormais ${user.money} dollars`})
        })
    } catch(error){
        etla.logger.error(error)
    }
}