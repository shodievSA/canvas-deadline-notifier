import { User } from "../../database/index.js";

async function getUserData() {

    try {
        const userList = await User.findAll({attributes: ['telegramId', 'canvasToken']});
        return userList;
    }
    catch (error) {
        console.error("Something went wrong!", error);
    }

}

export default getUserData;