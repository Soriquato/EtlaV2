import prisma from "../../db/prisma.js"

//TODO Transform this into a class function
//TODO Transform the filter into a key with ID+GuildID
export default async function userInDB(user){
    let result = await prisma.user.findUnique({
        where: {
            userId: user.id
        }
    })
    return result !== null
}