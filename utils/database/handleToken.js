import { User } from "../../database/index.js";

async function updateTokenOfUserOnDB(telegramId, token){
    try {
        const existingUser = await User.findOne({ where: { telegramId: telegramId } });
        existingUser.canvasToken = token;
        existingUser.save();
    }
    catch (error){
        console.error("Something went wrong!", error);
    }
}

export default updateTokenOfUserOnDB;