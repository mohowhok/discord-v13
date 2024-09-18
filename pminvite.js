const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pminv')
        .setDescription('Sends a private message to a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want to send an invitation to.')
                .setRequired(true)),
    async execute(interaction) {
        const requiredRoleId = '1273944284239757312'; // Only those with this role id can use it
        const logChannelId = '1251593270413234317'; // The log channel
        const customMessage = 'Hi! Here is an invitation for you!'; // Message content

        
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

    
        if (!interaction.member.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) {
            return interaction.reply({ content: 'You do not have permission to send messages.', ephemeral: true });
        }

        const user = interaction.options.getUser('user'); 

        try {
      
            await user.send(customMessage);
            await interaction.reply({ content: `You have successfully sent a private message to ${user.username}.`, ephemeral: true });

     
            const logChannel = await interaction.guild.channels.fetch(logChannelId);
            if (logChannel && logChannel.isText()) {
                const embed = new MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle("📩 [PM INVITE] 📩")
                    .setDescription(`The user ${interaction.user.tag} has sent a private message to the user ${user.tag}.`)
                    .setFooter({ text: 'Developer: moha.net | /pminv', iconURL: 'https://logopond.com/logos/1fd53a36b19dd7e88736d202efe37ed3.png' })
                    .setTimestamp();

                logChannel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'An error occurred while sending the message.', ephemeral: true });
        }
    },
};