const cron = require('node-cron')
const Discord = require('discord.js')
const RssFeedEmitter = require('rss-feed-emitter');
const feeder = new RssFeedEmitter({skipFirstLoad: true});
const client = new Discord.Client()
mongoose = require("mongoose");
require('dotenv').config()


// ========================== DB ======================================//
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
    console.log("Conectado ao banco de dados");
}).catch((err) => {
    console.log("Não consegui conectar no banco de dados!", err);
});
// ======================================//


// ========================== RSS   ======================================//
feeder.add({
    url: 'https://blackdesert-forums.playredfox.com/index.php?forums/atualiza%C3%A7%C3%B5es.190/index.rss',
    refresh: 2000,
    eventName: 'bdoUpdates'
  });

  feeder.on('bdoUpdates', function(item) {
    client.emit('patchNote', item);
  });
  // ======================================//




// ========================== JOBS ======================================//


//  0 HORAS - SÓ NA SEXTA
cron.schedule('* * * * *', () => {
    client.emit('bossTimer', [2, 3])
});

// 2 HORAS 
cron.schedule('45 1 * * MON', () => {
    client.emit('bossTimer', [2, 9])
});
cron.schedule('45 1 * * TUE', () => {
    client.emit('bossTimer', [3])
});
cron.schedule('45 1 * * WED', () => {
    client.emit('bossTimer', [9])
});
cron.schedule('45 1 * * THU', () => {
    client.emit('bossTimer', [3, 2])
});
cron.schedule('45 1 * * FRI', () => {
    client.emit('bossTimer', [2, 8])
});
cron.schedule('45 1 * * SAT', () => {
    client.emit('bossTimer', [9])
});
cron.schedule('45 1 * * SUN', () => {
    client.emit('bossTimer', [1])
});

// 11 HORAS
cron.schedule('45 10 * * MON', () => {
    client.emit('bossTimer', [1])
});
cron.schedule('45 10 * * TUE', () => {
    client.emit('bossTimer', [2])
});
cron.schedule('45 10 * * WED', () => {
    client.emit('bossTimer', [3, 2])
});
cron.schedule('45 10 * * THU', () => {
    client.emit('bossTimer', [2, 1])
});
cron.schedule('45 10 * * FRI', () => {
    client.emit('bossTimer', [1])
});
cron.schedule('45 10 * * SAT', () => {
    client.emit('bossTimer', [2, 9])
});
cron.schedule('45 10 * * SUN', () => {
    client.emit('bossTimer', [3, 1])
});



// 16 HORAS
cron.schedule('45 15 * * MON', () => {
    client.emit('bossTimer', [3, 9])
});
cron.schedule('45 15 * * TUE', () => {
    client.emit('bossTimer', [3, 1])
});
cron.schedule('45 15 * * WED', () => {
    client.emit('bossTimer', [3, 1])
});
cron.schedule('45 15 * * THU', () => {
    client.emit('bossTimer', [2, 1])
});
cron.schedule('45 15 * * FRI', () => {
    client.emit('bossTimer', [3, 9])
});
cron.schedule('45 15 * * SAT', () => {
    client.emit('bossTimer', [3, 1])
});
cron.schedule('45 15 * * SUN', () => {
    client.emit('bossTimer', [2, 9])
});


// 18 HORAS
cron.schedule('45 17 * * FRI', () => {
    client.emit('bossTimer', [4])
});

// 20 HORAS
cron.schedule('45 19 * * MON', () => {
    client.emit('bossTimer', [3, 1])
});
cron.schedule('45 19 * * TUE', () => {
    client.emit('bossTimer', [2, 9])
});
cron.schedule('45 19 * * WED', () => {
    client.emit('bossTimer', [6, 5])
});
cron.schedule('45 19 * * THU', () => {
    client.emit('bossTimer', [3, 1])
});
cron.schedule('45 19 * * FRI', () => {
    client.emit('bossTimer', [3, 9])
});
cron.schedule('45 19 * * SAT', () => {
    client.emit('bossTimer', [3, 1])
});
cron.schedule('45 19 * * SUN', () => {
    client.emit('bossTimer', [2, 9])
});


// 23 HORAS
cron.schedule('45 19 * * MON', () => {
    client.emit('bossTimer', [7])
});
cron.schedule('45 19 * * TUE', () => {
    client.emit('bossTimer', [8])
});
cron.schedule('45 19 * * WED', () => {
    client.emit('bossTimer', [7])
});
cron.schedule('45 19 * * FRI', () => {
    client.emit('bossTimer', [7])
});

cron.schedule('45 19 * * SUN', () => {
    client.emit('bossTimer', [8])
});






module.exports = client