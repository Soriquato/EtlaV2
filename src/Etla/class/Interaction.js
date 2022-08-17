import Discord from 'discord.js';

export default class Interaction {
    constructor(data){
        this.type = data.type
        this.id = data.id
        this.applicationId = data.applicationId
        this.channelId = data.channelId
        this.user = data.user
        this.user.premiumSinceTimestamp = data.premiumSinceTimestamp
        this.user.roles = data._roles
        this.member = data.member
        this.member.joinedTimestamp = data.joinedTimestamp
        this.member.nickname = data.nickname
        this.pending = data.pending
        this.userLocale = data.locale
        this.guildLocale = data.guildLocale
        this.commandId = data.commandId
        this.commandName = data.commandName
        this.deferred = data.deferred
        this.replied = data.replied
        this.options = data.options._hoistedOptions
    }

}