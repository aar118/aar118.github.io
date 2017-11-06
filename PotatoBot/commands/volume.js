exports.run = (client, message, args, level) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please be in a voice channel first!');
    }
    const voiceConnection = message.guild.voiceConnection;
    if (!voiceConnection) return message.reply('I must be in a voice channel before I can perform any music actions!');
    const queue = client.queues.get(message.guild.id);
    if (!queue) return message.reply('I must have some songs before I can change the volume of the song!');
    
    let vol = args.join(' ');
    if (!vol) return message.channel.send(`Current volume is set at ${client.queues.get(message.guild.id).songs[0].dispatcher.volume * 100}%`);
    if (vol < 0 || vol > 100) return message.reply('Volume must be a value between 0% and 100%!');

    message.channel.send(`Setting volume to ${vol}%`).then(() => {
        message.guild.voiceConnection.volume = vol / 100;
        client.queues.get(message.guild.id).songs[0].dispatcher.setVolume(vol / 100);
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "volume",
    category: "Music",
    description: "Sets the stream volume",
    usage: "volume [value]"
};