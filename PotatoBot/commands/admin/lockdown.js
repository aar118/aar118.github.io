const { Command } = require('discord.js-commando');
const ms = require('ms');

module.exports = class LockCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lockdown',
            group: 'admin',
            memberName: 'lockdown',
            description: 'This will lock a channel down for a set duration, be it in hours, minutes, or seconds.',
            examples: ['lockdown [duration]'],
            userPermissions: ['MANAGE_CHANNELS'],
            clientPermissions: ['MANAGE_CHANNELS'],
            guildOnly: true,
            args: [
                {
                    key: 'time',
                    prompt: 'How long do you want to lockdown?',
                    type: 'string'
                }
            ]
        });
    }
    run(msg, { time }) {
        if (!this.client.lockit) this.client.lockit = [];
        let validUnlocks = ['release', 'unlock'];
        if (!time) return msg.reply('You must set a duration for the lockdown in either hours, minutes or seconds');

        if (validUnlocks.includes(time)) {
            msg.channel.overwritePermissions(msg.guild.id, {
                SEND_msgS: null
            }).then(() => {
                msg.channel.send('Lockdown lifted.');
                clearTimeout(this.client.lockit[msg.channel.id]);
                delete this.client.lockit[msg.channel.id];
            }).catch(error => {
                console.log(error);
            });
        } else {
            msg.channel.overwritePermissions(msg.guild.id, {
                SEND_msgS: false
            }).then(() => {
                msg.channel.send(`Channel locked down for ${ms(ms(time), { long: true })}`).then(() => {

                    this.client.lockit[msg.channel.id] = setTimeout(() => {
                        msg.channel.overwritePermissions(msg.guild.id, {
                            SEND_msgS: null
                        }).then(msg.channel.send('Lockdown lifted.')).catch(console.error);
                        delete this.client.lockit[msg.channel.id];
                    }, ms(time));

                }).catch(error => {
                    console.log(error);
                });
            });
        }
    }
}