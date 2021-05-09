require("dotenv").config();

let Discord = require("discord.js");
let fs = require("fs");
let util = require("util");
let readdir = util.promisify(fs.readdir);

let client = new Discord.Client();
client.commands = new Discord.Collection();
let emojis = require("./emoji.json");
let config = require("./config.json")



async function init() {
    let folders = await readdir("./commands/");
folders.forEach(direct =>{
  const commandFiles = fs.readdirSync('./commands/' + direct + "/").filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
      const command = require(`./commands/${direct}/${file}`);
      client.commands.set(command.name, command);
  }
  });
}
init();


client.on("ready", async() => {
    client.user.setActivity(`Transcripts`, {type: 'WATCHING'})
});


client.on("message", async(message) => {
    let prefix = `t!`
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!cmd) return;
    if(!cmd.enabled) return message.channel.send(
        new Discord.MessageEmbed()
        .setTitle('Command is Disabled')
        .setDescription("This command is currently disabled by the developer.\n It will be available soon!")
        .setFooter(`Requested By ${!message.member.nickname ? message.author.username : message.member.nickname}`, message.author.displayAvatarURL({dynamic:true}))
    )


    if(cmd.userPermissions === '1') return cmd.execute(client, message, args);
    if(cmd.userPermissions === '2'){
        if(message.member.hasPermission("MANAGE_MESSAGES")) return cmd.execute(client, message, args);
        else return message.channel.send(
            new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`${emojis.cross} You need \`Manage Messages\` Permission to execute this command`)
            .setFooter(config.footer, client.user.displayAvatarURL())
        )
    }
    if(cmd.userPermissions === '3'){
        if(message.member.hasPermission("MANAGE_GUILD")) return cmd.execute(client, message, args);
        else return message.channel.send(
            new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`${emojis.cross} You need \`Manage Server\` Permission to execute this command`)
            .setFooter(config.footer, client.user.displayAvatarURL())
        )
    }

   


    

})





client.login(process.env.TOKEN);