const { Command } = require('discord.js-commando');

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'Pauses the music.',
            examples: ['pause'],
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 3
            }
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_MESSAGES');
    }

    run(msg) {
        const queue = this.queue.get(msg.guild.id);
        if (!queue) return msg.reply('There is no music to pause!');
        if (!queue.songs[0].dispatcher) return msg.reply('That song hasn\'nt even started playing!');
        if (!queue.songs[0].playing) return msg.reply('The music is already paused.');
        queue.songs[0].dispatcher.pause();
        queue.songs[0].playing = false;

        return msg.reply('paused the music!');
    }

    get queue() {
        if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;

        return this._queue;
    }
}