const { Command } = require('discord.js-commando');

module.exports = class CleanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clean',
            group: 'admin',
            memberName: 'clean',
            description: 'Automatically deletes a select number of messages in the channel.',
            examples: ['clean [amount]'],
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