const { Command } = require('discord.js-commando');

module.exports = class RollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'misc',
            memberName: 'roll',
            description: 'Rolls a dice.',
            examples: ['roll [reps] [sides]'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: 'reps',
                    prompt: 'How many times do you want to roll the dice?',
                    type: 'integer'
                },
                {
                    key: 'sides',
                    prompt: 'How many sides does the dice have?',
                    type: 'integer'
                }
            ]
        });
    }

    run(msg, { reps, sides }) {
        const results = [];
        if (reps < 1) return msg.reply('Rolls must be greater than 0');
        if (sides < 2) return msg.reply('Sides must be greater than 1');


        for (var i = 0; i < reps; i++) {
            results.push(Math.floor((Math.random() * sides) + 1));
        }

        return msg.channel.send(`== Results ==\n${results.map(r => `${r}`).join(', ')}`, { code: "asciidoc" });
    }
}