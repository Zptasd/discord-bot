const { EmbedBuilder } = require('discord.js');

module.exports = {
  id: 'why_security_email',

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Why is a security email required?')
      .setDescription('Your security email helps confirm account ownership and provides an additional recovery method if your Microsoft account is ever locked or requires additional verification.')
      .setColor('#FF0000')
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
