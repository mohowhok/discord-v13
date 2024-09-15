const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getavatar')
        .setDescription('Displays the user profile picture.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user whose avatar you want to display.')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        
        const embedMessage = new MessageEmbed()
            
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 })))))
            .setFooter({ text: `requested ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embedMessage], ephemeral: true });
    },
};