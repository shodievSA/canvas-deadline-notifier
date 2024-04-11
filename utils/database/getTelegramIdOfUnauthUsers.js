import { User } from "../../database/index.js";
import { Op } from "sequelize";
async function getTelegramIdOfUnauthUsers() {
    try {
        const userList = await User.findAll({
            attributes: ['telegramId'],
            where: {
                canvasToken: null
            },
            raw: true,
        });
        console.log(userList)
        return userList;
    }
    catch (error) {
        console.error("Something went wrong!", error);
    }
}

export default getTelegramIdOfUnauthUsers;