const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');

module.exports = class StopSongCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            guildOnly: true,
            description: 'Stops the music.',
            examples: ['stop']
        });
    }

    run(msg) {
        if (!msg.member.voiceChannel) return msg.channel.send('You need to be in a voice channel to stop music!');
        const queue = this.queue.get(msg.guild.id);
        if (!queue) return msg.channel.send('There is nothing playing that I can stop for you.');
        const song = queue.songs[0];
        queue.songs = [];
        if (song.dispatcher) song.dispatcher.end('Stop command has been used');
        return undefined;
    }

    get queue() {
        if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;

        return this._queue;
    }
}