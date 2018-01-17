
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  category: 'Administrative',
  description: 'Mutes or unmutes a mentioned user',
  usage: 'un/mute [mention] [reason]'
};

const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'admin',
            memberName: 'mute',
            description: 'Mutes the mentioned user.',
            examples: ['mute [user] [reason]'],
            userPermissions: ['MUTE_MEMBERS'],
            clientPermissions: ['MUTE_MEMBERS'],
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to mute?',
                    type: 'user'
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason for the mute?',
                    type: 'string'
                }
            ]
        });
    }
    run(msg, { user, reason }) {
        let modlog = this.client.channels.find('name', this.client.config.defaultSettings.modLogChannel);
        let muteRole = this.client.guilds.get(msg.guild.id).roles.find('name', this.client.config.defaultSettings.muteRole);
        if (!modlog) return msg.reply('I cannot find a mod-log channel').catch(console.error);
        if (!muteRole) return msg.reply('I cannot find a mute role').catch(console.error);
        if (reason.length < 1) return msg.reply('You must supply a reason for the mute.').catch(console.error);
        if (msg.mentions.users.size < 1) return msg.reply('You must mention someone to mute them.').catch(console.error);
        const embed = new RichEmbed()
            .setColor(0x00AE86)
            .setTimestamp()
            .addField('Action:', 'Un/Mute')
            .addField('User:', `${user.username}#${user.discriminator}`)
            .addField('Modrator:', `${msg.author.username}#${msg.author.discriminator}`)
            .addField('Reason: ', reason);

        if (!msg.guild.member(this.client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return msg.reply('I do not have the correct permissions.').catch(console.error);

        if (msg.guild.member(user).roles.has(muteRole.id)) {
            msg.guild.member(user).removeRole(muteRole).then(() => {
                return this.client.channels.get(modlog.id).send({ embed }).catch(console.error);
            });
        } else {
            msg.guild.member(user).addRole(muteRole).then(() => {
                return this.client.channels.get(modlog.id).send({ embed }).catch(console.error);
            });
        }
    }
}