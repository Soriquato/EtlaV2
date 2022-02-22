import express from "express"
const app = express()
const port = 3000
import Logger from '../log/Logger.js'
let logger = new Logger()
import etla from "../class/Elta.js"

app.get('/', (req, res) => {
    res.send(etla.commands)
})

app.listen(port, () => {
    etla.logger.info(`L'application écoute au port ${port}`)
})