import { User } from "../../database/index.js";

async function getUserNotificationTime(telegramID) {

    const userNotificationTime = await User.findOne({
        where: { telegramId: telegramID },
        attributes: ["notificationTime"]
    });

    return userNotificationTime['notificationTime'];

}

export default getUserNotificationTime;