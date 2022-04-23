import Discord from 'discord.js'
import etla from "./Elta.js"
import prisma from '../db/prisma.js'

//TODO Make the super function work with all the GuildMember properties
//TODO Maybe replace the super function by this.property = options.property ?
export default class EtlaGuildMember extends Discord.GuildMember{
    constructor(options){
        console.log(options)
        super(options.client, options, options.GuildMember)
        this._roles = options._roles
        this.avatar = options.avatar
        this.communicationDisabledUntilTimestamp = options.communicationDisabledUntilTimestamp
        this.guild = options.guild
    }

    test(){
        return this
    }
}