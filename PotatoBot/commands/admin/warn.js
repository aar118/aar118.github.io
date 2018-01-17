const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class WarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            group: 'admin',
            memberName: 'warn',
            description: 'Warns the mentioned user.',
            examples: ['warn [user] [reason]'],
            userPermissions: ['KICK_MEMBERS'],
            clientPermissions: ['KICK_MEMBERS'],
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
        let modlog = this.client.channels.find('name', this.client.config.defaultSettings.modLogChannel);
        if (!modlog) return msg.reply('I cannot find a mod-log');
        if (reason.length < 1) return msg.reply('You must supply a reason for the warning.');
        if (msg.mentions.users.size < 1) return msg.reply('You must mention someone to warn them.');

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