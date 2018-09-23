const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class PurgeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'admin',
            memberName: 'purge',
            description: 'Kicks everyone without the DoNotPurge role.',
            examples: ['purge'],
            userPermissions: ['ADMINISTRATOR'],
            clientPermissions: ['ADMINISTRATOR'],
            guildOnly: true
        });
    }
    run(msg) {
        let client = this.client;
        let modlog = client.channels.find('name', client.config.defaultSettings.modLogChannel);
        if (!modlog) return msg.reply('I cannot find a mod-log');
        let reason = 'You have been PURGED';
        msg.guild.members.forEach(function (guildMember) {
            let user = guildMember.user;
            let purgeRole = client.guilds.get(msg.guild.id).roles.find('name', 'DoNotPurge');
            if (!msg.guild.member(user).kickable) {
                console.log(`I cannot kick ${user.username}`);
            } else {
                if (!msg.guild.member(user).roles.has(purgeRole.id)) {
                    const embed = new Discord.MessageEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .addField('Action:', 'Kick')
                        .addField('User:', `${user.username}#${user.discriminator}`)
                        .addField('Modrator:', `${msg.author.username}#${msg.author.discriminator}`)
                        .addField('Reason: ', reason);
                    client.channels.get(modlog.id).send({ embed });
                    msg.guild.member(user).kick();
                }
            }
        });
        return;
    }
}