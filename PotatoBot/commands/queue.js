exports.run = (client, message, args, level) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please be in a voice channel first!');
    }
    if (!message.guild.voiceConnection) return message.reply('I\'m not connected to a voice channel!');
    if (!client.queues.get(message.guild.id)) return message.reply(`There is no queue! Create one with ${client.config.defaultSettings.prefix}play`);

    let output = `= Song List = \n`;
    const songs = client.queues.get(message.guild.id).songs;
    songs.forEach(c => {
        // url: url, title: info.title, requester: message.author.username
        output += `${c.title} requested by ${c.requester} - URL: ${c.url} \n`;
    });
    message.channel.send(output, { code: "asciidoc" });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'queue',
    category: 'Music',
    description: 'Displays the queue.',
    usage: 'queue'
};