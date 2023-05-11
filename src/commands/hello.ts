import { CommandInteraction, ApplicationCommandType, Client, AttachmentBuilder } from "discord.js"
import { Command } from "../command"
import * as Canvas from "@napi-rs/canvas"

export const Hello: Command = {
    name: "hello",
    description: "Says hello",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

		const canvas = Canvas.createCanvas(700, 250); 
		const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./image.png');

        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        const attachment = new AttachmentBuilder(await canvas.encode('webp'), { name: 'profile-image.png' });

        const content = "Hi there"
        await interaction.followUp({
            ephemeral: true,
            content: content,
            files: [attachment],
        })
    }
}
