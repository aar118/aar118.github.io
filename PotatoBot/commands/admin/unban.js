const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class unBanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            group: 'admin',
            memberName: 'unban',
            description: 'UnBans the mentioned user.',
            examples: ['unban [user] [reason]'],
            userPermissions: ['BAN_MEMBERS'],
            clientPermissions: ['BAN_MEMBERS'],
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to ban?',
                    type: 'user'
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason for the ban?',
                    type: 'string'
                }
            ]
        });
    }
    run(msg, { user, reason }) {
        this.client.unbanReason = reason;
        this.client.unbanAuth = msg.author;
        let modlog = this.client.channels.find('name', this.client.config.defaultSettings.modLogChannel);
        if (!modlog) return msg.say('I cannot find a mod-log');
        if (reason.length < 1) return msg.say('You must supply a reason for the ban.');
        if (!user) return msg.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
        msg.guild.unban(user);

        const embed = new RichEmbed()
            .setColor(0x00AE86)
            .setTimestamp()
            .addField('Action:', 'UnBan')
            .addField('User:', `${user.username}#${user.discriminator}`)
            .addField('Modrator:', `${msg.author.username}#${msg.author.discriminator}`)
            .addField('Reason: ', reason);
        return this.client.channels.get(modlog.id).send({ embed });
    }
}