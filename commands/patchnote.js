const patchNoteModel= require("../models/patchNote")
module.exports =
{
  run: async (client, message, args) => {
    if (!message.member.hasPermission(module.exports.conf.permission)) {
      return message.reply(`Você não tem permissão para usar esse comando.`)
    } else if (!args.length) {
      return message.reply(`Você não usou o comando de forma correta, tente usar ${module.exports.help.usage}`)
    }
    let verifyAlready = await patchNoteModel.find({ guild: message.guild.id })
    let channel = message.guild.channels.cache.get(args[0].replace(/\D/g, ''))
    if (args[0] === "remover") {
      if (verifyAlready.length) {
        try {
          await patchNoteModel.findOneAndDelete({ guild: message.guild.id })
          return message.reply("Os servidor não irá mais receber as atualizações semanais.")
        } catch (error) {
          return message.reply("Ocorreu um erro ao tentar remover o canal de Pach Note.")
        }
      } else{
        return message.reply("Esse servidor não possuí nenhuma configuração para o Pach Note.")
      }
    }

    if (!channel) {
      return message.reply("Não encontrei esse canal no servidor.")
    } else if (channel.type != "text") {
      return message.reply("No momento o Pach Note, só funciona em canais de texto.")
    } else if (verifyAlready.length) {
      try {
        if (verifyAlready.map(res => res.channel) == channel.id) {
          return message.reply(`O canal ${channel} já está setado como canal de Pach Notes.`)
        }
        await patchNoteModel.updateOne({ guild: message.guild.id }, { channel: channel.id })

        return message.reply(`O canal de Boss Timer mudou de  <#${verifyAlready.map(res => res.channel)}> para ${channel}.`)
      } catch {
        return message.reply("Ocorreu um erro ao tentar atualizar o canal de Pach Notes.")
      }

    } else {
      try {
        await patchNoteModel.create({
          channel: channel.id,
          guild: message.guild.id,
          guildName: message.guild.name
        })
        return message.reply(`O canal ${channel} foi setado para receber os patchnotes.`)
      } catch {
        return message.reply("Não consegui completar essa acão.")
      }

    }
  },
  conf: {
    permission: "ADMINISTRATOR"
  },

  get help() {
    return {
      name: 'patchnote',
      aliases: ['patchnotes', 'patchnotas', 'atualizacoes'],
      description: 'Seta um canal para ser anunciado o patchnote',
      usage: `**${process.env.PREFIX}patchnote \`#canal(mention) ou id\`**`,
      category: 'Info'
    }
  }
}
