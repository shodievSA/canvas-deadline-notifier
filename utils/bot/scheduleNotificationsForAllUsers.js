import getUserData from "../database/getUserData.js";
import { User } from "../../database/index.js";

async function scheduleNotificationsForAllUsers() {
    const userDataList = await getUserData();
    const userNumOfRows = await User.count();
    if (userNumOfRows > 0) {
        userDataList.forEach(async (item) => {
            const telegramId = item.telegramId;
            startCronTask(telegramId);
        })
    }
}

export default scheduleNotificationsForAllUsers;