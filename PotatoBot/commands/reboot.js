exports.run = async (client, message, args, level) => {
    message.channel.send('Are you sure you want to reboot?\n\nReply with "cancel" to abort the reboot. The reboot will self-abort in 30 seconds.');

    const validAnswers = ['yes', 'y', 'no', 'n', 'cancel'];
    const collector = message.channel.createCollector(m => m.author.id === message.author.id, {time: 30000});
    collector.on('message', async m => {
        const lower = m.content.toLowerCase();
        if (lower === 'cancel' || lower === 'no' || lower === 'n') {
            return collector.stop('abort');
        } else if (lower === 'yes' || lower === 'y') {
            return collector.stop('kill');
        }

        return message.channel.send(`Only \"${validAnswers.join("', '")}\" are valid, please supply one of those.`)
    });

    collector.on('end', async (collected, reason) => {
        if (reason === 'kill') {
            message.channel.send('Rebooting now...');
            await client.destroy();
            process.exit();
        } else if (reason === 'time') {
            return message.channel.send('Reboot timed out.');
        } else if (reason === 'abort') {
            return message.channel.send('Reboot aborted');
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 10
};

exports.help = {
    name: 'reboot',
    category: "System",
    description: "Reboots the bot.",
    usage: "reboot"
};