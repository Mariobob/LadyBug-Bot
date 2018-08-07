const { Event } = require("klasa");
const { MessageEmbed } = require("discord.js");

class GuildDelete extends Event {

  run(guild) {
    if(!guild.available) return;
    
    if (!this.client.configs.preserveConfigs) guild.configs.destroy().catch(() => null);
    
    const channel = this.client.channels.get("454776806869041154");
    const embed = new MessageEmbed()
      .setTitle("Ladybug left a server.")
      .setDescription(guild.name)
      .setColor(0xff0000)
      .addField("Owner", guild.owner.user.tag)
      .addField("Member Count", guild.memberCount)
      .setFooter(guild.id);
    channel.send({ embed });
  }
}

module.exports = GuildDelete;
