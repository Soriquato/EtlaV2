import prisma from "../../db/prisma.js";
import etla from "../../class/Elta.js";

//TODO Transform this into a class function
//TODO Transform the filter into a key with ID+GuildID
export default async function initializeUser(user){
    try {
        await prisma.user.create({
            data: {
                userId: user.id
            }
        })
    } catch (error){
        etla.logger.error(error.message)
    }
}