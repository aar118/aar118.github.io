const { Command } = require('discord.js-commando');

module.exports = class eightBallCommand extends Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            group: 'misc',
            memberName: '8ball',
            description: 'Ask the magic 8ball a question.',
            examples: ['8ball [question]']
        });
    }

    run(msg) {
        const sayings = ["It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes, definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful"];

        const result = Math.floor((Math.random() * sayings.length) + 0);

        return msg.say(sayings[result]);
    }
}