module.exports = async (client, message) => {

    if (message.mentions.has(client.user)) {
        return message.reply(`meu prefixo é \`${process.env.PREFIX}\``)
    }

    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase()
    console.log(commandName)
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
        command.run(client, message, args)
    }
    catch (error) {
        console.log(error)
    }
}
