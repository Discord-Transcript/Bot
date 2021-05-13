let { MessageEmbed } = require("discord.js");
let moment = require("moment");


module.exports = {
    name: 'help',
    description: "Shows all available commands for public use",
    category: "Info",
    usage: "help <command> | help",
    aliases: ["commands"],
    userPermissions: "1",
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    enabled: true,
    donator: false,
    cooldown: 5000,

    execute(client, message, [commandName], data) {
        const authorName = message.member && message.member.nickname ? message.member.nickname : message.author.username;
        if (!commandName) {
            let embed = new MessageEmbed()
                .setTitle('Help Menu')
                .setDescription(`Hello ${authorName}. All my commands is listed below.\nPrefix: t!`)
                .setFooter(`Requested By ${authorName}`, message.author.displayAvatarURL({ dynamic: true }));

            client.commands.filter(x => x.category !== 'dev').each(x => {
                embed.addField(x.name, `Category: ${x.category}\n_${x.description}_`)
            });

            embed.addField("Useful Links", `[Website](https://dtranscript.cf)`);

            return message.channel.send(embed);
        } else {
            let command = client.commands.get(commandName) || client.commands.find(x => x.aliases && x.aliases.includes(commandName));
            let aliases = command.aliases || 'No Aliases';

            const embed = new MessageEmbed()
                .setTitle(`${command.name} Info`)
                .addField('Description:', `_${command.description}_`)
                .addField("Category:", command.category)
                .addField("Aliases:", aliases.join(",") || 'None')
                .addField("Usage:", command.usage)
                .addField("Cooldown", `${moment(command.cooldown).seconds()} Seconds`)
                .addField("Useful Links", `[Website](https://dtranscript.cf)`)
                .setFooter(`Requested By ${authorName}`, message.author.displayAvatarURL({ dynamic: true }));

            return message.channel.send(embed);
        }
    }
}