const { Command } = require('discord.js-commando');
const { exec } = require('child_process');

module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            group: 'admin',
            memberName: 'restart',
            description: 'Restarts the bot\'s process',
            examples: ['restart'],
            userPermissions: ['ADMINISTRATOR'],
            guildOnly: true
        });
    }
    async run(msg) {
        const statusMsg = await msg.reply('Restarting bot...');
        exec('pm2 restart index', (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                return statusMsg.edit('Could not restart bot');
            }

            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
}