let { MessageEmbed } = require("discord.js");
const { generate } = require("discord-transcript");
const emojis = require("../../emoji.json");
const config = require("../../config.json");

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

    async execute(client, message) {
        const msg = await message.channel.send(`${emojis.loading} Exporting Messages... | This may take a while`);
        let channelMessages = await message.channel.messages.fetch({ limit: 100 });

        const lastMessageId = channelMessages.lastKey();

        const extraMessages = await message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));

        if (extraMessages) channelMessages = channelMessages.concat(extraMessages);

        const msgs = channelMessages.array().reverse();

        const link = await generate(message, msgs, message.channel);

        console.log(`New export: ${link}`);

        const embed = new MessageEmbed()
            .setTitle('Transcript Generated')
            .setColor("GREEN")
            .setDescription(`[Click to view](${link})`)
            .setFooter(config.footer, client.user.displayAvatarURL({ dynamic: true }));

        return msg.edit(`${emojis.check} Exporting Complete`, embed);
    }
}
