const YouTube = require('simple-youtube-api');
exports.run = async (client, message, args, level) => {
    const youtube = new YouTube(client.config.defaultSettings.youtubeAPIKey);
    const search = args.join(' ');
    try {
        const results = youtube.searchVideos(search, 5).then(results => {
            return message.channel.send(`Top 5 Results\n\n${results.map(i => `${i.title}\n https://www.youtube.com/watch?v=${i.id}\n`).join('\n')}`, { code: "true" });
        });
        //return message.channel.send(`Top 5 Results\n\n ${results.map(i => `${i.title}\n https://www.youtube.com/watch?v=${i.id}\n`).join('\n')}`, { Code:true});
    } catch (e) {
        message.reply(e.message);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'search',
    category: 'Music',
    description: 'Searches for a song.',
    usage: 'search [search term]'
};