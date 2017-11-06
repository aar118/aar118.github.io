const ytdl = require('ytdl-core');
exports.run = (client, message, args, level) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please be in a voice channel first!');
    }
    if (!message.guild.voiceConnection) return message.reply('I have to be connected to a voice channel to do that!');
    if (!client.queues.get(message.guild.id).songs) return message.reply('You have to create a queue with !play first!');
    if (!client.queues.get(message.guild.id).songs[0].dispatcher) return message.reply('There isn\'t any songs playing yet!');

    message.channel.send(`Skipped: **${client.queues.get(message.guild.id).songs[0].title}**`);
    client.queues.get(message.guild.id).songs[0].dispatcher.end();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'skip',
    category: 'Music',
    description: 'Skips a song.',
    usage: 'skip'
};