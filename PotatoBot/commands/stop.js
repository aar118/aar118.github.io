exports.run = (client, message, args, level) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please be in a voice channel first!');
    }

    if (client.queues.has(message.guild.id)) {
        const song = client.queues.get(message.guild.id).songs[0];
        client.queues.get(message.guild.id).songs = [];
        song.dispatcher.end();
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'stop',
    category: 'Music',
    description: 'Stops the audio stream.',
    usage: 'stop'
};