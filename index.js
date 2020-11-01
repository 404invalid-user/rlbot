const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const fs = require('fs');
const conf = require('./conf.json')
const { botColour } = require('./conf.json')


const rRolesChannelId = "759732154233126924"
const newbRoleId = "770320936632188958"


/*bot.on('ready', () => {
    console.log('bot bot runing')
    console.error('og repo: https:// | help: http://invaliduser.uk.to/web-botbot/help | keep this here please')

    bot.user.setActivity("spooktober", { type: "STREAMING", url: "https://www.twitch.tv/bot" })
})*/

bot.on('ready', async() => {
    console.log('Ready!');


});





bot.on('message', async(message) => {
    let args = message.content.toLowerCase().substring(conf.prefix.length).split(" ");

    if (message.channel.type == "dm") return message.channel.send('cant accept dm right now');


    if (!message.content.toLowerCase().startsWith(conf.prefix)) return;

    if (args[0] == 'ping') {
        message.channel.send("Pinging...").then(m => {
            var ping = m.createdTimestamp - message.createdTimestamp;
            var apiPing = Math.round(bot.ws.ping)
            m.edit("ping: " + `${ping}` + "\napi ping: " + `${apiPing}`)
        })
    }

    if (args[0] == 'setup') {
        if (message.author.id !== '522534458071449620') return;
        let embed = new Discord.MessageEmbed()
            .setTitle('react with a :white_check_mark: to get access to this server')

        let rRolesChannel = bot.channels.cache.get(rRolesChannelId)

        let m = await rRolesChannel.send(embed);
        await m.react("✅");

        //So on and so forth

    }




})


bot.on('messageReactionAdd', async(reaction, user) => {


    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (reaction.message.channel.id === rRolesChannelId) {
        console.log('in channel')
        let newbRole = reaction.message.guild.roles.cache.find(role => role.name === "New Peeps");
        reaction.message.guild.members.cache.get(user.id).roles.remove(newbRole)
    }





    console.log("added response");
});
/*
    console.log('1')
    if (user.bot) return;
    console.log('2')
    if (!reaction.message.guild) return;

    console.log('3')
    if (reaction.message.channel.id === "759732154233126924")

        console.log('h')
    reaction.message.guild.members.cache.get(user.id).roles.remove('770320936632188958')
    console.log(`${reaction.message.guild.members.cache.get(user.id)}`)
})*/

bot.on('messageReactionRemove', (reaction, user) => {
    console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
});








bot.login(conf.token)