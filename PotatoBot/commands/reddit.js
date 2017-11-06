const request = require('request');
exports.run = async (client, message, args, level) => {
    if (!args) return message.reply('You must specify a sub!');
    var options = {
       url: `https://www.reddit.com/r/${args}/random.json?limit=1`
    }

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            const post = info[0] ? info[0] : info;
            if (post.data.children.length == 0) return message.reply('No subreddit by that name!');
            //console.log(JSON.stringify(info[0].data.children[0]));
            message.channel.send(`Permalink: ${post.data.children[0].data.permalink}\n${post.data.children[0].data.url}`);
        } else {
            console.log(error);
            console.log(response.statusCode);
        }
    }

    request(options, callback);

    //return message.channel.send(`== Results ==\n${results.map(r => `${r}`).join(', ')}`, { code: "asciidoc" });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'reddit',
    category: 'Misc',
    description: 'Picks a random hot post from subbredit.',
    usage: 'redit [subbredit]'
};