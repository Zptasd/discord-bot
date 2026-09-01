const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  id: 'retry_minecraft_button',

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId('minecraft_username_modal')
      .setTitle('Minecraft Username');

    const usernameInput = new TextInputBuilder()
      .setCustomId('minecraft_username')
      .setLabel('Minecraft Username')
      .setPlaceholder('Username')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const row = new ActionRowBuilder().addComponents(usernameInput);
    modal.addComponents(row);

    await interaction.showModal(modal);
  },
};
