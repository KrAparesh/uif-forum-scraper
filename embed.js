//const dotenv = require('dotenv')
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.login("OTAzMjc1MTY4MDkxMjM4NDIx.YXqmjg.AmNLCEShtb40iVoXFZmoDqVlowI");
client.on('ready', () => {
    console.log('Ready!')
    sendtext();
});
function sendtext(){
const exampleEmbed = new MessageEmbed()
.setColor(0x3498DB)
.setTitle("Header goes here with the link")
.setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
.setDescription("Currently taking up BA in Political Science as my undergraduate degree right now, which is a far cry from what I really wanted which is BFA in Computer Animation, as I really love animating sequences or scenes that would probably take a lot of effort or even nigh impossible to pull of when mimicked by real-life acting or cinematography.\n\nThere is this particular animation that I want to specialize, which is called sakuga, simply means 'animation' in Japanese. I am intrigued how each scene pans out, how frames are put together, and just basically the animation quality drastically gets better in pivotal moments. I also do not care much about the supposed low salary if it means I will be doing what I want for the rest of my life.\n\n“Choose a job you love and you'll never have to work a day in your life” – Confucius")
.setImage("http://i.imgur.com/yVpymuV.png")
.setThumbnail("http://i.imgur.com/p2qNFag.png")
.addField("\u200b", "\u200b")
/*
 * Takes a Date object, defaults to current date.
 */
.setTimestamp()
.setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png");
    client.channels.cache.get('903275860658913341').send({embeds: [exampleEmbed]});
}