import express from "express"
const app = express()
const port = 3000
import etla from "../class/Elta.js"

app.get('/', (req, res) => {
    res.send(etla.slashCommands)
})

app.listen(port, () => {
    etla.logger.info(`L'application écoute au port ${port}`)
})