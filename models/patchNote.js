const mongoose = require('mongoose');

const bossTimer = mongoose.Schema({
    guild: String,
    channel: String,
    guildName: String,
}, { versionKey: false, collection: 'patchnote' })

module.exports = mongoose.model("patchnote", bossTimer)