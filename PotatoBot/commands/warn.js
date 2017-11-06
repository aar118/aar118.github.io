const Discord = require('discord.js');
exports.run = (client, message, args, level) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = client.channels.find('name', client.config.defaultSettings.modLogChannel);
    if (!modlog) return message.reply('I cannot find a mod-log');
    if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.');

    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .addField('Action:', 'Kick')
        .addField('User:', `${user.username}#${user.discriminator}`)
        .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason: ', reason);
    return client.channels.get(modlog.id).send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'warn',
    category: 'Administrative',
    description: 'Issues a warning to the mentioned user.',
    usage: 'warn [mention]'
};