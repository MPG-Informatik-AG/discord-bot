import { CommandInteraction, ApplicationCommandType, Client } from "discord.js"
import { Command } from "../command"

export const Hello: Command = {
    name: "hello",
    description: "Says hello",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "Hi there"
        await interaction.followUp({
            ephemeral: true,
            content: content
        })
    }
}