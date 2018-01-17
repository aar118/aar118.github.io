const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');

module.exports = class SkipSongCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Skips a song.',
            guildOnly: true,
            examples: ['skip'],
            throttling: {
                usages: 2,
                duration: 3
            }
        });

        this.votes = new Map();
    }

    async run(msg) {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('You need to be in a voice channel to skip music!');
        const queue = this.queue.get(msg.guild.id);
        if (!queue) return msg.channel.send('There is nothing playing that I can skip for you.');

        const song = queue.songs[0];
        song.dispatcher.end('Skip command has been used');
        return msg.channel.send(`Skipped: **${song}**`);
    }

    get queue() {
        if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;

        return this._queue;
    }
}