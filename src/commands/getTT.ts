import { CommandInteraction, ApplicationCommandType, Client, AttachmentBuilder } from "discord.js"
import { Command } from "../command"
import { getTimetable } from "../webuntis/apiClient"
import * as Canvas from "@napi-rs/canvas"
import { Lesson } from "webuntis"

export const getTT: Command = {
    name: "gettt",
    description: "Gets the timetable from webuntis",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        const times = [740, 830, 935, 1020, 1115, 1205, 1255, 1345, 1435, 1525, 1610] 
        let tt = await getTimetable()

        const content = times.map(time => {
            return `${time}: ${tt[time]?.map(lesson => {
                if (lesson.code == "cancelled") {
                    return `~~${lesson.sg}~~`
                }
                return lesson.sg
            }).join(" ") || " -"}`
        }).join("\n")

        await interaction.followUp({
            ephemeral: true,
            content: content,
            files: [await generateImage(times, tt)]
        })
    }
}

async function generateImage (times: number[], tt: {[key: number]: Lesson[];}) {
    const pixel_per_class = 100;
    const canvas = Canvas.createCanvas(700, times.length * pixel_per_class); 
    const context = canvas.getContext('2d');


    // const background = await Canvas.loadImage('./image.png');
    //
    // context.drawImage(background, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < times.length; i++) {
        context.fillStyle = "grey"
        context.fillRect(0, i*pixel_per_class, 700, pixel_per_class-3)
    
        context.fillStyle = "black"
        context.font = "15px serif"
        if (tt[times[i]] != undefined) {
            context.fillText(tt[times[i]]?.[0].sg || "some class", 10, i*pixel_per_class + 10)
        }
    }

    return new AttachmentBuilder(await canvas.encode('webp'), { name: 'profile-image.png' });
}
