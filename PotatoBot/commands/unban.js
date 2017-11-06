const Discord = require('discord.js');
exports.run = (client, message, args, level) => {
    let reason = args.slice(1).join(' ');
    client.unbanReason = reason;
    client.unbanAuth = message.author;
    let user = args[0];
    let modlog = client.channels.find('name', client.config.defaultSettings.modLogChannel);
    if (!modlog) return message.reply('I cannot find a mod-log');
    if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
    if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
    message.guild.unban(user);

    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .addField('Action:', 'UnBan')
        .addField('User:', `${user.username}#${user.discriminator}`)
        .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason: ', reason);
    return client.channels.get(modlog.id).send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'unban',
    category: 'Administrative',
    description: 'UnBans the mentioned user.',
    usage: 'unban [mention] [reason]'
};