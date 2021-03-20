const { Client, MessageEmbed } = require('discord.js')
const config = require('./config')
const client = new Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setPresence(config.botActivity)
    if (!['kick', 'ban'].includes(config.verificationFail)) throw new TypeError('Punishment type must be either kick or ban')
})

client.on('guildMemberAdd', async member => {
    const embed = new MessageEmbed({ color: config.embedColor })
        .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`${member.guild.name} | Made By Million1156`)
        .setTimestamp()

    const answers = []
    member.roles.add(config.unverifiedRole).catch(() => {})

    for (let question of config.questions) {
        const msg = await member.send(embed.setDescription(question))
        const resp = await msg.channel.awaitMessages(m => !m.author.bot, { max: 1, time: 120000 })
        if (!resp.first()) {
            await member.send(embed.setDescription('You have been kicked due to not responding in time!'))
            return member[config.verificationFail]().catch(() => console.log(`Unabled to kick ${member.user.tag}`))
        }
        answers.push(resp.first().content)
    }

    member.roles.set([config.verifiedRole]).catch(() => {})
    member.send(embed.setDescription('Completed verification! You are able to speak now!'))

    const log = client.channels.cache.get(config.verifiedLog)
    const desc = answers.map((s, i) => `**${config.questions[i]}**\n${s}\n`).join('\n').match(/(.|\n){1,2000}/g)

    if (log) {
        for (let i in desc) {
            if (i == 0) log.send(new MessageEmbed({ color: config.embedColor }).setTitle(`${member.user.tag} Completed Verification`).setDescription(desc[i]))
            else if (i == desc.length - 1) log.send(new MessageEmbed({ color: config.embedColor }).setDescription(desc[i]).setFooter('Log split due to discords 2,000 character limit | Fuel Development'))
            else log.send(new MessageEmbed({ color: config.embedColor }).setDescription(desc[i]))
        }
    }
})

client.login(config.token).catch(() => {
    throw new TypeError('Invalid bot token')
})
