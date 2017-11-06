exports.run = (client, message) => {
    message.channel.send('Ping?')
        .then(msg => {
            msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ping',
    category: 'Misc',
    description: 'Ping/Pong command. I wonder what this does? /sarcasm',
    usage: 'ping'
};