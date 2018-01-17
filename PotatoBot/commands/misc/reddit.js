const { Command } = require('discord.js-commando');
const request = require('request');

module.exports = class RedditCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reddit',
            group: 'misc',
            memberName: 'reddit',
            description: 'Picks a random hot post from the subreddit.',
            examples: ['reddit [subreddit]'],
            args: [
                {
                    key: 'subreddit',
                    prompt: 'What subreddit do you want?',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { subreddit }) {
        if (!subreddit) return msg.reply('You must specify a sub!');
        var options = {
            url: `https://www.reddit.com/r/${subreddit}/random.json?limit=1`
        }

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                const info = JSON.parse(body);
                const post = info[0] ? info[0] : info;
                if (post.data.children.length == 0) return msg.reply('No subreddit by that name!');
                //console.log(JSON.stringify(info[0].data.children[0]));
                msg.channel.send(`Permalink: ${post.data.children[0].data.permalink}\n${post.data.children[0].data.url}`);
            } else {
                console.log(error);
                console.log(response.statusCode);
            }
        }

        request(options, callback);

        //return msg.channel.send(`== Results ==\n${results.map(r => `${r}`).join(', ')}`, { code: "asciidoc" });
    }
}