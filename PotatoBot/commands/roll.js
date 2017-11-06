exports.run = (client, message, args, level) => {
    if (!args || !args[0] || !args[1]) return message.reply('You must specify the number of rolls and sides of the dice!');
    const reps = args[0];
    const sides = args[1];
    const results = [];

    if (reps < 1) return message.reply('Rolls must be greater than 0');
    if (sides < 2) return message.reply('Sides must be greater than 1');


    for (var i = 0; i < reps; i++) {
        results.push(Math.floor((Math.random() * sides) + 1));
    }

    return message.channel.send(`== Results ==\n${results.map(r => `${r}`).join(', ')}`, { code: "asciidoc" });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'roll',
    category: 'Misc',
    description: 'Rolls a dice.',
    usage: 'roll [repetitions] [sides]'
};