import { WebUntis } from "webuntis"
import { Client } from "discord.js"
import ready from "./listeners/ready"
import interacionCreate from "./listeners/interacionCreate"
import * as fs from "fs"

const config = JSON.parse(fs.readFileSync("./config.json").toString())

console.log("Bot is starting ...")

const client = new Client({
    intents: []
})

ready(client)
interacionCreate(client)

client.login(config.token)


const untis = new WebUntis("MPG Schorndorf", "bindermar-mpg", "27032005", "hepta.webuntis.com")
untis.login().then(() => {
    console.log("untis logged in")
})
