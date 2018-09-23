const {
    Command
} = require('discord.js-commando');

module.exports = class eightBallCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'flip',
            group: 'misc',
            memberName: 'flip',
            description: 'Flip a coin',
            examples: ['flip']
        });
    }

    run(msg) {

        let result = Math.floor((Math.random() * 2) + 0);
        if (result == 1) {
            return msg.reply('The coin landed tails')
        } else if (result == 0) {
            return msg.reply('The coin landed heads')
        } else {
            return msg.reply('The coin landed on its side')
        }
    }
}