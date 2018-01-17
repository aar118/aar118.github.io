const { version } = require("discord.js");
const { Command } = require('discord.js-commando');
const moment = require("moment");
require("moment-duration-format");

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'util',
            memberName: 'stats',
            description: 'Gives some useful bot statistics.',
            examples: ['stats']
        });
    }

    run(msg) {
        const duration = moment.duration(this.client.uptime).format("D [days], H [hrs], m [mins], s [secs]");
        msg.say(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${this.client.users.size.toLocaleString()}
• Servers    :: ${this.client.guilds.size.toLocaleString()}
• Channels   :: ${this.client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`, { code: "asciidoc" });
    }
}