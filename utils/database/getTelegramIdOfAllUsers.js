import { User } from "../../database/index.js";

async function getTelegramIdOfAllUsers () {
    try {
        const userList = await User.findAll({attributes: ['telegramId',], raw: true})
        return userList;
    }
    catch (error){
        console.error("Something went wrong!", error);
    }
}

export default getTelegramIdOfAllUsers;