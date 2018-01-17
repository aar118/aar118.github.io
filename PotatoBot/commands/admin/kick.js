const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'admin',
            memberName: 'kick',
            description: 'Kicks the mentioned user.',
            examples: ['kick [user] [reason]'],
            userPermissions: ['KICK_MEMBERS'],
            clientPermissions: ['KICK_MEMBERS'],
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to kick?',
                    type: 'user'
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason for the kick?',
                    type: 'string'
                }
            ]
        });
    }
    run(msg, { user, reason }) {
        let modlog = this.client.channels.find('name', this.client.config.defaultSettings.modLogChannel);
        if (!modlog) return msg.reply('I cannot find a mod-log');
        if (reason.length < 1) return msg.reply('You must supply a reason for the kick.');
        if (msg.mentions.users.size < 1) return msg.reply('You must mention someone to kick them.');

        if (!msg.guild.member(user).kickable) return msg.reply('I cannot kick that member.');
        msg.guild.member(user).kick();

        const embed = new RichEmbed()
            .setColor(0x00AE86)
            .setTimestamp()
            .addField('Action:', 'Kick')
            .addField('User:', `${user.username}#${user.discriminator}`)
            .addField('Modrator:', `${msg.author.username}#${msg.author.discriminator}`)
            .addField('Reason: ', reason);
        return this.client.channels.get(modlog.id).send({ embed });
    }
}