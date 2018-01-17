const { Command } = require('discord.js-commando');

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'util',
            memberName: 'join',
            description: 'Join a joinable role.',
            examples: ['join [roleName]'],
            guildOnly: true,
            args: [
                {
                    key: 'roleName',
                    prompt: 'What role do you want to join?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    run(msg, { roleName }) {
        const roles = this.client.config.defaultSettings.joinableRoles;
        if (!roleName) return msg.channel.send(`== Joinable Roles ==\n${roles.map(i => `${i}`).join(', ')}`, { code: "asciidoc" });

        const role = this.client.guilds.get(msg.guild.id).roles.find('name', roleName);

        if (!role) return msg.reply(`That role doesn't exist! Use ${this.client.config.defaultSettings.prefix}join for a list of joinable roles. `);
        if (!msg.guild.member(this.client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return msg.reply('I do not have the correct permissions.').catch(console.error);

        msg.guild.member(msg.author).addRole(role).then(() => msg.reply(`Successfully joined role ${roleName}`));
    }
}