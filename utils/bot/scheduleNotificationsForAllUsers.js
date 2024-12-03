import Resources from "../../apiResources.js";
import scheduleNotifications from "./notifications.js";
import getUserData from "../database/getUserData.js";
import startCronTask from "../../cronTask.js";
import validateToken from "./tokenValidation.js";

async function scheduleNotificationsForAllUsers() {

    const userDataList = await getUserData();

    if (userDataList.length > 0) {

        userDataList.forEach(async (item) => {

            let isTokenValid = await validateToken(item.canvasToken);

            if (isTokenValid) {

                const { canvasToken, telegramId } = item;
                const resources = new Resources(canvasToken, telegramId);
                const assignments = await resources.getAssignments();
            
                if (assignments.length > 0) {

                    await scheduleNotifications(
                        assignments, resources, telegramId
                    );

                }

                await startCronTask(telegramId);

            }

        });
        
    }

}

export default scheduleNotificationsForAllUsers;