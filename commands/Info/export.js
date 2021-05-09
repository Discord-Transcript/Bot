let Discord = require("discord.js");
let moment = require("moment");
let exporter = require("discord-transcript");
let emojis = require("../../emoji.json");
let config = require("../../config.json");
module.exports = {
    name: 'export',
    description: "Exports the messages in this channel to a transcript",
    category: "General",
    usage: "export <1-100>",
    aliases: ["transcript"],
    userPermissions: "2",
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    enabled: true,
    donator: false,
    cooldown: 5000,
    



    async execute(client, message, args, data) {

        let numb = args[0];

        let message1 = await message.channel.messages.fetch({
            limit: numb
        });

        let messages = message1.array().reverse();

        let link = await exporter.generate(message, messages, message.channel);


        return message.channel.send(
            new Discord.MessageEmbed()
            .setTitle('Transcript Generated')
            .setColor("GREEN")
            .setDescription(`[Click to view](${link})`)
            .setFooter(config.footer, client.user.displayAvatarURL())
        )







    }
}