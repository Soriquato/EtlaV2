import express from "express"
import SlashCommandHandler from "../api/SlashCommandHandler.js"
const app = express()
const port = process.env.PORT
import etla from "../class/Elta.js"
import prisma from '../db/prisma.js'

app.get('/', async(req, res) => {
    res.send(await prisma.user.findMany())
})

app.get('/addmoney', async(req, res) => {
    let user = await prisma.user.findUnique({
        where: {userId: "383317521958305802"}
    })
    await prisma.user.update({
        where: {
            userId: "383317521958305802"
        },
        data: {
            currentMoney: user.currentMoney + 20
        }
    })


    res.send(await prisma.user.findMany())
})

app.get('/commands', async(req, res) => {
    let commandHandler = new SlashCommandHandler()
    res.send(await commandHandler.getAllCurrentSlashCommands())
})

app.get('/deletecommand', async(req, res) => {
    let commandHandler = new SlashCommandHandler()
    res.send(await commandHandler.deleteSlashCommand("1009031435312697434"))
})

app.listen(port, () => {
    etla.logger.info(`L'application écoute au port ${port}`)
})