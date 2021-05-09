let Discord = require("discord.js");
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
    



    async execute(client, message, args, data) {
        if(!args[0]){
       let embed = new Discord.MessageEmbed()
       .setTitle('Help Menu')
       .setDescription(`Hello ${!message.member.nickname ? message.author.username : message.member.nickname}. All my commands is listed below.\nPrefix: t!`)
       .setFooter(`Requested By ${!message.member.nickname ? message.author.tag : message.member.nickname}`, message.author.displayAvatarURL({dynamic:true}))
       client.commands.filter(x => x.category !== 'dev').each(x => {
           embed.addField(x.name, `Category: ${x.category}\n_${x.description}_`)
    });
    embed.addField("Usefull Links", `[Website](https://dtranscript.cf)`)
    return message.channel.send(embed);
        } else {
            let command = await client.commands.get(args[0]) || await client.commands.find(x => x.aliases && x.aliases.includes(args[0]));
            let aliases = command.aliases.map(x => x);
            if(!command.aliases) aliases = 'No Aliases';
            let embed = new Discord.MessageEmbed()
            .setTitle(`${command.name} Info`)
            .addField('Description:', `_${command.description}_`)
            .addField("Category:", command.category)
            .addField("Aliases:", aliases.join(",") || 'None')
            .addField("Usage:", command.usage)
            .addField("Cooldown", `${moment(command.cooldown).seconds()} Seconds`)
            .setFooter(`Requested By ${!message.member.nickname ? message.author.tag : message.member.nickname}`, message.author.displayAvatarURL({dynamic:true}))
       

            embed.addField("Usefull Links", `[Website](https://dtranscript.cf)`)
    return message.channel.send(embed);
            
        }
    }
}