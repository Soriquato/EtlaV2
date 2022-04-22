import Discord from 'discord.js'
import etla from "../class/Elta.js"
import prisma from '../db/prisma.js'


export default class EtlaUser extends Discord.User{
    constructor(options){
        super(options)
        this.money = prisma.user.findMany()
    }
}