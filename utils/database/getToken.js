import { User } from "../../database/index.js";

async function getTokenOfUserFromDB(telegramId){
    try {
        const existingUser = await User.findOne({ where: { telegramId: telegramId } });
        const token = existingUser.canvasToken;
        return token;
    }
    catch (error){
        console.error("Something went wrong!", error);
    }
}

export default getTokenOfUserFromDB;