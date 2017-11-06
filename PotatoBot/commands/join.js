exports.run = (client, message, args, level) => {
    const roles = client.config.defaultSettings.joinableRoles;
    if (!args[0]) return message.channel.send(`== Joinable Roles ==\n${roles.map(i => `${i}`).join(', ')}`, { code: "asciidoc" });

    const roleName = args.join(' ');
    const role = client.guilds.get(message.guild.id).roles.find('name', roleName);

    if (!role) return message.reply(`That role doesn't exist! Use ${client.config.defaultSettings.prefix}join for a list of joinable roles. `);
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

    message.guild.member(message.author).addRole(role).then(() => message.reply(`Successful joined role ${roleName}`));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'join',
    category: 'Misc',
    description: 'Join a joinable role.',
    usage: 'join [role]'
};