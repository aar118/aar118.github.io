const { Command } = require('discord.js-commando');
const { escapeMarkdown } = require('discord.js');
const { RichEmbed } = require('discord.js');
const { oneLine, stripIndents } = require('common-tags');
const request = require('request-promise');
const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const Song = require('../../structures/Song');

module.exports = class PlaySongCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Play a song.',
            guildOnly: true,
            examples: ['play [search term]'],
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [
                {
                    key: 'url',
                    prompt: 'What song would you like to play?',
                    type: 'string'
                }
            ]
        });

        this.queue = new Map();
        this.youtube = new Youtube(client.config.defaultSettings.youtubeAPIKey);
    }

    async run(msg, args) {
        const url = args.url.replace(/<(.+)>/g, '$1');
        const queue = this.queue.get(msg.guild.id);

        let voiceChannel;
        if (!queue) {
            voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel) return msg.channel.send('You need to be in a voice channel to play music!');
            const permissions = voiceChannel.permissionsFor(msg.client.user);
            if (!permissions.has('CONNECT')) {
                return msg.channel.send('I cannot connect to this voice channel, make sure I have the proper permissions!');
            }
            if (!permissions.has('SPEAK')) {
                return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
            }
        } else if (!queue.voiceChannel.members.has(msg.author.id)) {
            return msg.reply('you\'re not in the voice channel. You better not be trying to mess with their mojo, man.');
        }


        const statusMsg = await msg.reply('obtaining video details...');
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await this.youtube.getPlaylist(url);
            console.log(queue);
            return this.handlePlaylist(playlist, queue, voiceChannel, msg, statusMsg);
        } else {
            try {
                var video = await this.youtube.getVideo(url);

                return this.handleVideo(video, queue, voiceChannel, msg, statusMsg);
            } catch (error) {
                try {
                    var videos = await this.youtube.searchVideos(url, 10);
                    let index = 0;
                    msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            max: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return statusMsg.edit('No or invalid value entered, cancelling video selection.');
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await this.youtube.getVideoByID(videos[videoIndex - 1].id);

                    return this.handleVideo(video, queue, voiceChannel, msg, statusMsg);
                } catch (err) {
                    console.error(err);
                    return statusMsg.edit('🆘 I could not obtain any search results.');
                }
            }
        }
    }


    async handleVideo(video, queue, voiceChannel, msg, statusMsg) {
        if (video.durationSeconds === 0) {
            statusMsg.edit(`${msg.author}, you cannot play live streams.`);

            return null;
        }

        if (!queue) {
            const queue = {
                textChannel: msg.channel,
                voiceChannel,
                connection: null,
                songs: [],
                volume: this.client.config.defaultSettings.defaultVolume
            };
            this.queue.set(msg.guild.id, queue);

            const result = await this.addSong(msg, video);
            const resultMessage = {
                color: 3447003,
                author: {
                    name: `${msg.author.tag} (${msg.author.id})`,
                    icon_url: msg.author.displayAvatarURL({ format: 'png' }) // eslint-disable-line camelcase
                },
                description: result
            };

            if (!result.startsWith('👍')) {
                this.queue.delete(msg.guild.id);
                statusMsg.edit('', { embed: resultMessage });

                return null;
            }

            statusMsg.edit(`${msg.author}, joining your voice channel...`);
            try {
                const connection = await queue.voiceChannel.join();
                queue.connection = connection;
                this.play(msg.guild, queue.songs[0]);
                statusMsg.delete();

                return null;
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                this.queue.delete(msg.guild.id);
                statusMsg.edit(`I could not join the voice channel: ${error}`);

                return null;
            }
        } else {
            const result = await this.addSong(msg, video);
            const resultMessage = {
                color: 3447003,
                author: {
                    name: `${msg.author.tag} (${msg.author.id})`,
                    icon_url: msg.author.displayAvatarURL({ format: 'png' }) // eslint-disable-line camelcase
                },
                description: result
            };
            statusMsg.edit('', { embed: resultMessage });

            return null;
        }
    }

    async handlePlaylist(playlist, queue, voiceChannel, msg, statusMsg) {
        console.log(queue);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
            const video2 = await this.youtube.getVideoByID(video.id);
            if (video2.durationSeconds === 0) {
                statusMsg.edit(`${msg.author}, you can't play live streams.`);

                return null;
            }

            if (!queue) {
                queue = {
                    textChannel: msg.channel,
                    voiceChannel,
                    connection: null,
                    songs: [],
                    volume: this.client.config.defaultSettings.defaultVolume
                };
                this.queue.set(msg.guild.id, queue);

                const result = await this.addSong(msg, video2);
                if (!result.startsWith('👍')) this.queue.delete(msg.guild.id);

                statusMsg.edit(`${msg.author}, joining your voice channel...`);
                try {
                    const connection = await queue.voiceChannel.join(); // eslint-disable-line no-await-in-loop
                    queue.connection = connection;
                    const _this = this;
                    setTimeout(function () { _this.play(msg.guild, queue.songs[0]) }, 2000);
                    statusMsg.delete();
                } catch (error) {
                    console.error(`Error occurred when joining voice channel: ${error}`);
                    this.queue.delete(msg.guild.id);
                    statusMsg.edit(`${msg.author}, unable to join your voice channel.`);
                }
            } else {
                await this.addSong(msg, video2); // eslint-disable-line no-await-in-loop
                statusMsg.delete();
            }
        }

        queue.textChannel.send({
            embed: {
                color: 3447003,
                author: {
                    name: `${msg.author.tag} (${msg.author.id})`,
                    icon_url: msg.author.displayAvatarURL({ format: 'png' }) // eslint-disable-line camelcase
                },
                description: stripIndents`
					Playlist: [${playlist.title}](https://www.youtube.com/playlist?list=${playlist.id}) added to the queue!
				`
            }
        });

        return null;
    }

    addSong(msg, video) {
        const queue = this.queue.get(msg.guild.id);

        if (!this.client.isOwner(msg.author)) {
            const songMaxLength = this.client.config.defaultSettings.maxSongLength;
            if (songMaxLength > 0 && video.durationSeconds > songMaxLength * 60) {
                return oneLine`
					👎 ${escapeMarkdown(video.title)}
					(${Song.timeString(video.durationSeconds)})
					is too long. No songs longer than ${songMaxLength} minutes!
				`;
            }
            if (queue.songs.some(song => song.id === video.id)) {
                return `👎 ${escapeMarkdown(video.title)} is already queued.`;
            }
            const songMaxSongs = this.client.defaultSettings.maxSongs;
            if (songMaxSongs > 0
                && queue.songs.reduce((prev, song) => prev + song.member.id === msg.author.id, 0)
                >= songMaxSongs) {
                return `👎 you already have ${songMaxSongs} songs in the queue. Don't hog all the airtime!`;
            }
        }

        console.log(`Adding song to queue. song: ${video.id}`);
        const song = new Song(video, msg.member);
        queue.songs.push(song);

        return oneLine`
			👍 ${song.url.match(/^https?:\/\/(api.soundcloud.com)\/(.*)$/) ? `${song}` : `[${song}](${`${song.url}`})`}
		`;
    }

    play(guild, song) {
        const queue = this.queue.get(guild.id);

        if (!song) {
            queue.textChannel.send(`No more songs to play, bruh`);
            queue.voiceChannel.leave();
            this.queue.delete(guild.id);
            return;
        }

        const playing = queue.textChannel.send({
            embed: {
                color: 3447003,
                author: {
                    name: song.username,
                    icon_url: song.avatar // eslint-disable-line camelcase
                },
                description: `
					${song.url.match(/^https?:\/\/(api.soundcloud.com)\/(.*)$/) ? `${song}` : `[${song}](${`${song.url}`})`}
				`,
                image: { url: song.thumbnail }
            }
        });

        const dispatcher = queue.connection.playStream(ytdl(song.url, { audioonly: true }))
            .on('end', reason => {
                if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                else console.log(reason);
                queue.songs.shift();
                const _this = this;
                setTimeout(function () { _this.play(guild, queue.songs[0]) }, 2000);
            })
            .on('error', error => {
                console.error(error);
                playing.then(msg => msg.edit(`❌ Couldn't play ${song}. What a drag!`));
            });
        queue.connection.player.opusEncoder.setPLP(0.01);
        dispatcher.setVolumeLogarithmic(queue.volume / 5);
        song.dispatcher = dispatcher;
        song.playing = true;

        queue.textChannel.send(`Now playing: ${song}`);
    }
}