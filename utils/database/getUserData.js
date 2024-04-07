import { User } from "../../database/index.js";
import validateToken from "../bot/tokenValidation.js";
async function getUserData() {

    try {
        const userList = await User.findAll({ attributes: ['telegramId', 'canvasToken'] },);
        const validatedUsers = await Promise.all(userList.map(async (user) => {
            const isValid = await validateToken(user.canvasToken);
            if (isValid) {
                return user;
            } else {
                return null;
            }
        }));

        const filteredUsers = validatedUsers.filter(user => user !== null);
        return filteredUsers;
    }
    catch (error) {
        console.error("Something went wrong!", error);
    }

}

export default getUserData;