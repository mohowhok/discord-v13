const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a player off the server for a given reason.')
        .addUserOption(option =>
            option.setName('exploit')
                .setDescription('The user you want to kick.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason why you want to fire him')
                .setRequired(true)),
    async execute(interaction) {
        const allowedRole = '1273944284239757312'; /// only those with this role can use the command [ replace ur role ] /// 

        if (!interaction.member.roles.cache.has(allowedRole)) {
            return interaction.reply({ content: 'You do not have permission for this command!', ephemeral: true });
        }

        const targetUser = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        const member = interaction.guild.members.cache.get(targetUser.id);
        if (!member) {
            return interaction.reply({ content: 'This user cannot be found on the server!', ephemeral: true });
        }

        if (member.kickable) {
            await member.kick(reason);
            return interaction.reply({ content: `<@${member.id}> has been successfully kicked from the server. Reason: ${reason}` });
        } else {
            return interaction.reply({ content: `I can't kick this user because they are higher ranked than me or equal.', ephemeral: true });
        }
    }
};