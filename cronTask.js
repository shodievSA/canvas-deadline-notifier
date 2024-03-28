import { CronJob } from "cron";
import Resources from "./apiResources.js";
import scheduleNotifications from "./utils/bot/notifications.js";
import getTokenOfUserFromDB from "./utils/database/getToken.js";

async function startCronTask(userID) {

    const token = await getTokenOfUserFromDB(userID);
    const resources = new Resources(token, userID);

    const job = new CronJob(
        "5 0 * * *",
        async function()
        {
            const assignments = await resources.getAssignments(); 
            scheduleNotifications(assignments, resources, userID);
        }
    );
    
    job.start();
}

export default startCronTask;