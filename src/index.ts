import { Client, Collection, Events, GatewayIntentBits } from "discord.js";

import { config } from "dotenv";

import Commands from "./lib/Commands.js";

config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, async (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

let commands: Collection<string, { data: object; execute: CallableFunction }> =
  new Collection();

for (const command of Commands) {
  if (!("data" in command) || !("execute" in command)) {
    console.warn(`[WARNING] A command is missing a property!`);
    continue;
  }

  commands.set(command.data.name, command);
}
