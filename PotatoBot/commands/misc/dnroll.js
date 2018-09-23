const { Command } = require('discord.js-commando');

module.exports = class DNRollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dnroll',
            group: 'misc',
            memberName: 'dnroll',
            description: 'Roll with dice notation.',
            examples: ['dnroll [notation]'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: 'notation',
                    prompt: 'The dice notation to be interpreted and executed.',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { notation }) {
        var validNotation = /^(\d+)?d(\d+)([+-]\d+)?$/.exec(notation);
        if (!validNotation) return msg.reply('Unable to parse the provide dice notation');

        var match = validNotation;
        var reps = (typeof match[1] == 'undefined') ? 1 : parseInt(match[1]);
        var sides = parseInt(match[2]);
        var modifier = (typeof match[3] == 'undefined') ? 0 : parseInt(match[3]);

        const results = [];
        for (var i = 0; i < reps; i++) {
            results.push(Math.floor((Math.random() * sides) + 1));
        }

        results.push(modifier);

        return msg.channel.send(`== Results ==\n${results.map(r => `${r}`).join(', ')}\n== Total ==\n${results.reduce((sum, x) => sum + x)}`, { code: "asciidoc" });
    }
}