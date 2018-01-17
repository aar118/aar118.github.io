const Commando = require('discord.js-commando');
const path = require('path');

// We also load the rest of the things we need in this file:
const config = require("./config.json");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Commando.Client({
    owner: config.ownerID,
    commandPrefix: config.defaultSettings.prefix,
    disableEveryone: true,
    unknownCommandResponse: false
});

// Here we load the config.json file that contains our token and our prefix values.
client.config = config;

client.registry
    .registerGroups([
        ['info', 'Info'],
        ['economy', 'Economy'],
        ['social', 'Social'],
        ['games', 'Games'],
        ['item', 'Item'],
        ['weather', 'Weather'],
        ['music', 'Music'],
        ['tags', 'Tags'],
        ['docs', 'Documentation'],
	    ['admin', 'Administration'],
	    ['misc', 'Misc']
    ])
    .registerDefaults()
    .registerTypesIn(path.join(__dirname, 'types'))
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.on('ready', () => {
    console.log('Logged in!');
    //client.user.setGame('Lemme Smash');
    client.user.setActivity('Lemme Smash');
});

client.login(client.config.token);