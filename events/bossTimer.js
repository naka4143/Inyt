const bossHelper = require('../utils/boss')
const boss = new bossHelper()
const bossTimerModel = require("../models/bossTimer")

module.exports = async (client, data) => {
    let guilds = await bossTimerModel.find({})
    boss.spawnMessageImage(data)
    guilds.forEach(element => {
        let channel = client.channels.fetch(element.channel).then(channel => {
            try {
                channel.send({
                    
                    embed: {
                        footer:{
                            name: client.user.name,
                            icon_url: client.user.avatarURL
                        }, 
                        description: `${boss.spawnMessage(data)}`,
                        author: {
                            name: 'Boss Timer ⏰',
                            icon_url: client.user.avatarURL,
                        },
                        timestamp: new Date(),
                        image: {
                            url: 'attachment://boss.png'
                        }
                    },
                    files: [{
                        attachment: './images/final.png',
                        name: 'boss.png'
                    }]
                })
        
                
            } catch (error) {
                console.log(`Não consegui enviar a mensagem no canal ${channel.name} no servidor ${element.name}`)
            }
        
        })

    
    });
   
}