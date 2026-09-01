const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  id: 'enter_security_email_button',

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId('security_email_modal')
      .setTitle('Security email');

    const emailInput = new TextInputBuilder()
      .setCustomId('security_email')
      .setLabel('Full Security Email')
      .setPlaceholder('Security Email')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const row = new ActionRowBuilder().addComponents(emailInput);
    modal.addComponents(row);

    await interaction.showModal(modal);
  },
};
