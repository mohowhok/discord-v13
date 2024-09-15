const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears a given amount of messages in the channel.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of messages you want to clear')
                .setRequired(true)),
    async execute(interaction) {
        const requiredRoleId = '1273944284239757312';  /// only those with this role can use the command [ replace ur role ] /// 
        const logChannelId = '1268137423838122004'; 

       
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

    
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return interaction.reply({ content: 'You do not have permission to delete messages.', ephemeral: true });
        }

        const amount = interaction.options.getInteger('amount');

   
        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Please enter a number between 1 and 100.', ephemeral: true });
        }

        try {
       
            const fetchedMessages = await interaction.channel.messages.fetch({ limit: amount });
            const deletedMessages = fetchedMessages.map(msg => `${msg.author.tag}: ${msg.content}`).join('\n');

            await interaction.channel.bulkDelete(amount, true);
            await interaction.reply({ content: `Successfully deleted ${amount} message.`, ephemeral: true });

            const logChannel = await interaction.guild.channels.fetch(logChannelId);
            if (logChannel && logChannel.isText()) {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Deleted messages')
                    .setDescription(`The user ${interaction.user.tag} has deleted ${amount} messages in the ${interaction.channel.name} channel. \The deleted messages are:${deletedMessages}`)
                	.setFooter({ text: 'Developer: moha.net', iconURL: 'https://logopond.com/logos/1fd53a36b19dd7e88736d202efe37ed3.png' })
                    .setTimestamp();
					

                logChannel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'An error occurred while deleting messages.', ephemeral: true });
        }
    },
};