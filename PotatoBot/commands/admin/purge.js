const { Command } = require('discord.js-commando');

module.exports = class PurgeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'admin',
            memberName: 'purge',
            description: 'Automatically deletes a select number of messages in the channel.',
            examples: ['purge [amount]'],
            userPermissions: ['MANAGE_MESSAGES'],
            clientPermissions: ['MANAGE_MESSAGES'],
            guildOnly: true,
            args: [
                {
                    key: 'messageCount',
                    prompt: 'How many messages would you like to delete?',
                    type: 'integer',
                    default: 1
                }
            ]
        });
    }
    run(msg, { messageCount }) {
        messageCount += 1;
        msg.channel.bulkDelete(messageCount);
    }
}