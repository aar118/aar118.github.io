const ytdl = require('ytdl-core');
exports.run = (client, message, args, level) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please be in a voice channel first!');
    }

    if (!message.guild.voiceConnection) voiceChannel.join().then(() => message.channel.send('Connected to the voice channel!'));

    const url = args.join(' ');
    if (url == '' || url === undefined) return message.channel.send(`You must add a YouTube video url, or id after ${client.config.defaultSettings.prefix}add`);

    // gets the youtube url info and adds it to the songs queue
    ytdl.getInfo(url, (err, info) => {
        if (err) return message.channel.send('Invalid YouTube Link: ' + err);
        if (!client.queues.has(message.guild.id)) {
            client.queues.set(message.guild.id, {});
            client.queues.get(message.guild.id).playing = false;
            client.queues.get(message.guild.id).songs = [];
        }

        // if not playing a song, then play the song
        if (!client.queues.get(message.guild.id).playing) {
            client.queues.get(message.guild.id).songs.push({ url: url, title: info.title, requester: message.author.username, dispatcher: null });
            play(client.queues.get(message.guild.id).songs[0]);
        } else {
            // add song to queue
            client.queues.get(message.guild.id).songs.push({ url: url, title: info.title, requester: message.author.username, dispatcher: null });
            message.channel.send(`Added **${info.title}** to the queue`);
        }
    });

    function play(song) {
        // makes a dispatcher stream
        song.dispatcher = message.guild.voiceConnection.playStream(ytdl(song.url, { audioonly: true }));
        // when the song ends, shift the songs array and then play the next song if there are any; otherwise, disconnect
        song.dispatcher.on('end', () => {
            client.queues.get(message.guild.id).songs.shift();
            if (!client.queues.get(message.guild.id).songs[0]) {
                voiceChannel.leave();
                client.queues.delete(message.guild.id);
                return message.channel.send('No more songs, leaving the voice channel!');
            }
            play(client.queues.get(message.guild.id).songs[0]);
        });
        message.channel.send(`Playing **${song.title}**!`);
        client.queues.get(message.guild.id).playing = true;
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'play',
    category: 'Music',
    description: 'Plays a song.',
    usage: 'play [url]'
};