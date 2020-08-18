module.exports = async (client) => {
    client.user.setActivity(`Use ${process.env.PREFIX}help | ${client.guilds.cache.size}`, { type: 'PLAYING' });
}