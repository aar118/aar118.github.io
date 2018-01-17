const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'admin',
            memberName: 'ban',
            description: 'Bans the mentioned user.',
            examples: ['ban [user] [reason]'],
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
        let modlog = this.client.channels.find('name', this.client.config.defaultSettings.modLogChannel);
        if (!modlog) return msg.say('I cannot find a mod-log');
        if (reason.length < 1) return msg.say('You must supply a reason for the ban.');
        if (msg.mentions.users.size < 1) return msg.say('You must mention someone to ban them.');

        if (!msg.guild.member(user).bannable) return msg.say('I cannot ban that member');
        msg.guild.ban(user, 2);

        const embed = new RichEmbed()
            .setColor(0x00AE86)
            .setTimestamp()
            .addField('Action:', 'Ban')
            .addField('User:', `${user.username}#${user.discriminator}`)
            .addField('Modrator:', `${msg.author.username}#${msg.author.discriminator}`)
            .addField('Reason: ', reason);
        return this.client.channels.get(modlog.id).send({ embed });
    }
}