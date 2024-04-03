import Resources from "../../apiResources.js";
import scheduleNotifications from "./notifications.js";
import getUserData from "../database/getUserData.js";
import startCronTask from "../../cronTask.js";
import { User } from "../../database/index.js";
import { sixHours } from "../../time.js";

async function scheduleNotificationsForAllUsers() 
{
    const userDataList = await getUserData();
    const rowsNum = await User.count();

    if (rowsNum > 0) 
    {
        userDataList.forEach(async (item) => 
        {
            const { canvasToken, telegramId } = item;
            const resources = new Resources(canvasToken, telegramId);

            const assignments = (await resources.getAssignments())
            .filter((assignment) => 
            {
                const notificationTime = Date.parse(assignment.deadline) - sixHours;
                const currentTime = new Date().getTime();

                if (currentTime < notificationTime) return assignment;
            });

            if (assignments.length > 0)
            {
                scheduleNotifications(assignments, resources, telegramId);
            } 
            
            await startCronTask(telegramId);
        });
    }
}

export default scheduleNotificationsForAllUsers;