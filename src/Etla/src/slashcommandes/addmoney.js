import etla from "../../class/Elta.js"

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