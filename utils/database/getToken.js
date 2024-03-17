import { User } from "../../database/index.js";

function getTokenOfUserFromDB(telegramId){
    try {
        const existingUser = User.findOne({ where: { telegramId: telegramId } });
        const token = existingUser.canvasToken;
        return token;
    }
    catch (error){
        console.error("Something went wrong!", error);
    }
}

export default getTokenOfUserFromDB;