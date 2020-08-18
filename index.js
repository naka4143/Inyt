const client = require('./app')
const Discord = require('discord.js');
client.commands = new Discord.Collection();
const { readdirSync } = require('fs')
require('dotenv').config()


const evtFiles = readdirSync('./events/')
console.log(`Carregando o total de ${evtFiles.length} eventos`)
evtFiles.forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./events/${f}`)
  client.on(eventName, event.bind(null, client))
})

const commandFiles = readdirSync('./commands/').filter(file => file.endsWith('.js'));
console.log(`Carregando o total de ${commandFiles.length} comandos`)
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.help.name, command);
    if (command.help.aliases) {
      command.help.aliases.forEach(alias => client.commands.set(alias, command))
    }
}

client.login(process.env.TOKEN)







