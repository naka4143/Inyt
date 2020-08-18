const {  MessageEmbed } = require('discord.js');

exports.embedError = (title, message) => {
    const Embed = new MessageEmbed()
    .setTitle(title)
    .setColor("#FF0000")
    .setDescription(message)
    return Embed
}
