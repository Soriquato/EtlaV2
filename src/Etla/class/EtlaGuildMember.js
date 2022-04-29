import Discord from 'discord.js'
import etla from "./Elta.js"
import prisma from '../db/prisma.js'

//TODO Make the super function work with all the GuildMember properties //Not sure about this
//TODO Add the prisma client from the Etla client
//TODO Why does it not work : money not being saved the right way
export default class EtlaUser{
    constructor(id){
        this.id = id
        this.data = {}
        this.money = 0
        this.quantityCommandeDone = 0
    }

    async initialize(){
        let result = await prisma.user.findUnique({
            where: {
                userId: this.id
            }
        })
        this.data = result
        this.money = result.currentMoney
        this.quantityCommandeDone = result.quantityCommandeDone
    }

    //TODO Make it work with the class //Works, but TODO upgrade the await thing
    async addMoney(amount){
        //let result = await prisma.user.findUnique({
        //    where: {
        //        userId: '383317521958305802'
        //    }
        //})
        //let money = result["currentMoney"]
        await this.initialize()
        await prisma.user.update({
            where: {
                userId: "383317521958305802"
            },
            data: {
                currentMoney: this.money + 20
            }
        })
    }
}