import Etla from './src/class/Elta.js'
import { informations } from './src/commandes/ping.js'
import SlashCommandHandler from './src/api/SlashCommandHandler.js'

const etla = new Etla()
const handler = new SlashCommandHandler()
let response = await handler.getAllCurrentSlashCommands()
console.log(response.data)

etla.login("Nzc1Mjk2OTc3MzAyNDU0MzAy.X6kRkw.ddOMN6g2ueFMy1QpdgVjZmWGgPU")

export default etla