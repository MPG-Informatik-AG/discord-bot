import { Command } from "./command"
import { Hello } from "./commands/hello"
import { getTT } from "./commands/getTT"

export const Commands: Command[] = [Hello, getTT]
