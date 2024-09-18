const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolesinfo')
        .setDescription('Query state information'),
    async execute(interaction) {

        const roleIds = [
            '1273939642839863306',
            '1273939938076790814',
            '1273940112715153450',
            '1273939794195513415',
            '1273941640406503425',
            '1273940172764876810',
            '1273940253391982756',
            '1273940287156387923',
            '1273940361449963531',
            '1273940361449963531',
            '1273941218312720434',
            '1273943841954857052',
            '1273975175779717140',
            '1273946289855266878'
        ];

        let embedMessage = new MessageEmbed()
            .setColor("#ffffff")
            .setTitle("Current file members")
            .setDescription("Number of tags in current ranks:");

        const fields = [];
        let oldestMember = null;

        for (const roleId of roleIds) {
            const role = interaction.guild.roles.cache.get(roleId);
            if (role) {
                const memberCount = role.members.size;
                fields.push({ name: role.name, value: `Tagok number: ${memberCount}`, inline: false });

                // Find the oldest member
                role.members.each(member => {
                    if (!oldestMember || member.joinedAt < oldestMember.joinedAt) {
                        oldestMember = member;
                    }
                });
            } else {
                fields.push({ name: roleId, value: 'This role ID is not found on the server.', inline: false });
            }
        }

 
        if (oldestMember) {
            fields.push({
                name: 'Oldest member',
                value: `${oldestMember.user.tag} (joined: ${oldestMember.joinedAt.toDateString()})`,
                inline: false
            });
        } else {
            fields.push({
                name: 'Oldest file member',
                value: 'No tag available.',
                inline: false
            });
        }

        embedMessage.addFields(fields);

        await interaction.reply({ embeds: [embedMessage], ephemeral: true });
    },
};