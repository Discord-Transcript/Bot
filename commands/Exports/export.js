let Discord = require("discord.js");
let moment = require("moment");
let exporter = require("discord-transcript");
let emojis = require("../../emoji.json");
let config = require("../../config.json");
module.exports = {
    name: 'export',
    description: "Exports the messages in this channel to a transcript",
    category: "Exports",
    usage: "export",
    aliases: ["transcript"],
    userPermissions: "2",
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    enabled: true,
    donator: false,
    cooldown: 5000,
    



    async execute(client, message, args, data) {
        let msg = await message.channel.send(`${emojis.loading} Exporting Messages... | This may take a while`);

       

        let channelMessages = await message.channel.messages.fetch({
            limit: 100
        });

        

        while(channelMessages.size === 100) {
            let lastMessageId = channelMessages.lastKey();
            let channelMessages1 = await message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
            if(channelMessages1)
                channelMessages.concat(channelMessages1);
        }
        let msgs = await channelMessages.array().reverse();

        let link = await exporter.generate(message, msgs, message.channel);
        console.log(link);


        return msg.edit(`${emojis.check} Exporting Complete`,
            new Discord.MessageEmbed()
            .setTitle('Transcript Generated')
            .setColor("GREEN")
            .setDescription(`[Click to view](${link})`)
            .setFooter(config.footer, client.user.displayAvatarURL())
        )







    }
}
