import Resources from "../../apiResources.js";
import scheduleNotifications from "./notifications.js";
import getUserData from "../database/getUserData.js";
import { bot } from "../../config/integrations.js";
import { User } from "../../database/index.js";

async function scheduleNotificationsForAllUsers() {
    const userDataList = await getUserData();
    const userNumOfRows = User.count();
    if (userNumOfRows > 0) {
        userDataList.forEach(async (item) => {
            const canvasToken = item.canvasToken;
            const telegramId = item.telegramId;
            const resources = new Resources(canvasToken, telegramId);
            const assignments = await resources.getAssignments();
            scheduleNotifications(assignments, resources, bot.telegram);
        })
    }
}

export default scheduleNotificationsForAllUsers;