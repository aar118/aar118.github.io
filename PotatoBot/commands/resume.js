exports.run = (client, message, args, level) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please be in a voice channel first!');
    }
    if (!client.queues.get(message.guild.id).songs[0].dispatcher.paused) return message.reply('Playback is already resumed.');
    message.channel.send('Resuming audio stream');
    client.queues.get(message.guild.id).songs[0].dispatcher.resume();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'resume',
    category: 'Music',
    description: 'Resumes the audio stream.',
    usage: 'resume'
};