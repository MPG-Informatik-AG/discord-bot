import { Client } from "discord.js"
import * as webuntis from "./webuntis/apiClient"
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
