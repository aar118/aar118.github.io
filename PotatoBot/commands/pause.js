exports.run = (client, message, args, level) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please be in a voice channel first!');
    }
    if (client.queues.get(message.guild.id).songs[0].dispatcher.paused) return message.reply('Playback is already paused.');
    message.channel.send('Pausing audio stream');
    client.queues.get(message.guild.id).songs[0].dispatcher.pause();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'pause',
    category: 'Music',
    description: 'Pauses the audio stream.',
    usage: 'pause'
};