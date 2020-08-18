const stripHtml = require("string-strip-html");
const patchNoteModel = require("../models/patchNote")
module.exports = async (client, data) => {
    let guilds = await patchNoteModel.find({})
    guilds.forEach(res => {
        let channel = client.channels.fetch(res.channel).then(channel => {
            try {
                const { result } = stripHtml(data.description)
                channel.send({
                    embed: {
                        url: data.link,
                        footer: {
                            text: data.author,
                            icon_url: client.user.avatarURL
                        },
                        color: 3160121,
                        title: data.title,
                        timestamp: data.date,

                        description: `${result.replace(data.title, '')}`,
                        image: {
                            url: data.description.match(/src=(.+?[.png]")/)[1].replace('"', "")
                        }
                    },


                })

            } catch (error) {
                console.log(error)
            }

        })

    });

}