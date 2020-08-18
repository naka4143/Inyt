const Data = require('./boss_data.json')
const fs = require("fs")
const { createCanvas, loadImage } = require('canvas')



class Boss {
    constructor() {
        this.bossData = JSON.parse(JSON.stringify(Data))
    }

    /** @description This Return a string with boss spawn
    * @return {string}
    */
    spawnMessage(boss) {
        let bosses = this.getBoss(boss) // if this return false you params are wrong.
        if (bosses == false) {
            throw new Error("Maybe Some Error Happen!")
        } else {

            let bossName = bosses.map(res => res.name)
            let bossBio = bosses.map(res => res.bio)
            let spawnText = bossName.length == 2 ? `${bossName.slice(-1)} & ${bossName.slice(0, bossName.length - 1)}` : `${bossName}`
            return `${spawnText} ${bossName.length == 2 ? 'vão' : 'vai'} spawnar em 15 minutos`
        }


    }

    /** @description Save a image in actual directory
    */
    spawnMessageImage(boss) {
        let canvas = createCanvas(450, 170)
        let bosses = this.getBoss(boss) // if this return false you params are wrong.

        if (bosses == false) {
            throw new Error("Maybe Some Error Happen!")
        }

        let bossName = bosses.map(res => res.name)
        const ctx = canvas.getContext('2d')

        const positionsText = [[100, 150], [350, 150]]
        const positionsImages = [[60, 40], [300, 50]]

        ctx.fillStyle = "#222222";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white"
        ctx.textAlign = 'center'
        ctx.font = "30px Marcellus"

        for (const key in bossName) {
            if (bosses.length == 2) {
                ctx.fillText(bossName[key], positionsText[key][0], positionsText[key][1]);
                loadImage(`./images/${bossName[key].toLowerCase()}.png`).then(image => {
                    ctx.drawImage(image, positionsImages[key][0], 1, 100, 100)
                    const buffer = canvas.toBuffer('image/png')
                    fs.writeFileSync('./images/final.png', buffer)

                })
            } else {
                ctx.fillText(bossName[key], 230, 160);
                loadImage(`./images/${bossName[key].toLowerCase()}.png`).then(image => {
                    ctx.drawImage(image, 180, 30, 100, 100)
                    const buffer = canvas.toBuffer('image/png')
                    fs.writeFileSync('./images/final.png', buffer)
                })

            }
        }

    }
    /** @description Get the boss by id
    * @return {array}
    */
    getBoss(boss) {
        if (Array.isArray(boss) != true) {
            return false
        }
        for (const key in boss) {

            if (boss[key] > Object.keys(this.bossData).slice(-1)) {
                return false
            }
        }
        return boss.map(res => this.bossData[res])
    }


}



module.exports = Boss


