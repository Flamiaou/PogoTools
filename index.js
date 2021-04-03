//require('dotenv').config();
const token = "TON TOKEN";
const prefix = "TON PREFIX";
const twitchURL = process.env.TWITCH_URL;
const Discord = require('discord.js');

var fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('codé by Jordan');
    client.user.setPresence({
        game: {
            name: "utilise tr.help",
            url: twitchURL
        }
    });
});


client.on('message', (message) => {
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Commande inexistante! Utilisez tr.help pour afficher une liste de commandes.');
    }




});

client.login(token);