import express from "express"
const app = express()
const port = process.env.PORT
import etla from "../class/Elta.js"
import prisma from '../db/prisma.js'

app.get('/', async(req, res) => {
    res.send(await prisma.user.findMany())
})

app.get('/addmoney', async(req, res) => {
    res.send(await prisma.user.findMany())
})

app.listen(port, () => {
    etla.logger.info(`L'application écoute au port ${port}`)
})