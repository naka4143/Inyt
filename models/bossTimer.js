const mongoose = require('mongoose');

const bossTimer = mongoose.Schema({
    guild: String,
    channel: String,
    guildName: String,
}, { versionKey: false, collection: 'bosstimer' })

module.exports = mongoose.model("bosstimer", bossTimer)