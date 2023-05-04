import { CommandInteraction, ApplicationCommandType, Client } from "discord.js"
import { Command } from "../command"
import { getTimetable } from "../webuntis/apiClient"

export const getTT: Command = {
    name: "gettt",
    description: "Gets the timetable from webuntis",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        const times = [740, 830, 935, 1020, 1115, 1205, 1345, 1435, 1525, 1610] 
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
            content: content
        })
    }
}
