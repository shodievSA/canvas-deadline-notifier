import { User } from "../../database/index.js";
import validateToken from "../bot/tokenValidation.js";
async function getUserData() {

    try {
        const userList = await User.findAll({ attributes: ['telegramId', 'canvasToken'] },);
        const validatedUsers = await Promise.all(userList.filter(async (user) => {
            const isValid = await validateToken(user.canvasToken);
            return isValid;
        }));

        return validatedUsers;
    }
    catch (error) {
        console.error("Something went wrong!", error);
    }

}

export default getUserData;