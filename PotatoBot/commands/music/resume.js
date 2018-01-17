const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            description: 'Resumes the music.',
            examples: ['resume'],
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
        if (!queue) return msg.reply('There is no music to resume');
        if (!queue.songs[0].dispatcher) return msg.reply('That song hasn\'nt even started playing!');
        if (queue.songs[0].playing) return msg.reply('The music is already playing.');

        queue.songs[0].dispatcher.resume();
        queue.songs[0].playing = true;

        return msg.reply('resumed the music!');
    }

    get queue() {
        if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;

        return this._queue;
    }
}