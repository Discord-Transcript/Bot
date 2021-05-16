const { generate, getTranscript } = require("discord-transcript");
const emojis = require("../../emoji.json");
const config = require("../../config.json");

module.exports = {
    name: 'getexport',
    description: "Get the url of the export",
    category: "Exports",
    usage: "getexport <id>",
    aliases: ["transcript"],
    userPermissions: "2",
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    enabled: true,
    donator: false,
    cooldown: 5000,

    async execute(client, message) {
        let id = args[0] 
        if(!id) return message.channel.send(`Invalid ID`);

        return await getTranscript(message, id);
    }
}
