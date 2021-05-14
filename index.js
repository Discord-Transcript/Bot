

const {
    Client,
    Collection,
    MessageEmbed
} = require("discord.js");

const {
    readdirSync
} = require("fs");

const client = new Client();

const emojis = require("./emoji.json");
const config = require("./config.json");
client.db = require("./db");

client.db.LoadData();
let db = require("./db");

if(config.heroku === 'true'){
    require("dotenv").config();
}


client.commands = new Collection();
const folders = readdirSync("./commands/");
folders.forEach(direct => {
    const commandFiles = readdirSync('./commands/' + direct + "/").filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${direct}/${file}`);
        client.commands.set(command.name, command);
    }
});



client.on("ready", async () => {
    client.user.setActivity(`Transcripts`, {
        type: 'WATCHING'
    });
});

client.on("message", async (message) => {
    let guildDB = await db.GetGuild(message.guild.id);
    const prefix = guildDB.prefix || config.prefix;

    if (!message.content.startsWith(prefix)) return; // If message doesn't start with prefix ignore it

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!cmd) return;

    if (!cmd.enabled) {
        const authorName = message.member && message.member.nickname ? message.member.nickname : message.author.username;
        const embed = new MessageEmbed()
            .setTitle('Command is Disabled')
            .setDescription("This command is currently disabled by the developer.\n It will be available soon!")
            .setFooter(`Requested By ${authorName}`, message.author.displayAvatarURL({
                dynamic: true
            }));
        return message.channel.send(embed);
    }

    if (cmd.userPermissions === "2" && !message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${emojis.cross} You need \`Manage Messages\` Permission to execute this command`)
            .setFooter(config.footer, client.user.displayAvatarURL());
        return message.channel.send(embed);
    }

    if (cmd.userPermissions === '3' && !message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${emojis.cross} You need \`Manage Server\` Permission to execute this command`)
            .setFooter(config.footer, client.user.displayAvatarURL());
        return message.channel.send(embed);
    }

    return cmd.execute(client, message, args);
})


client.login(process.env.TOKEN);