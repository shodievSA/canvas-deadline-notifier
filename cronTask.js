import { CronJob } from "cron";
import Resources from "./apiResources.js";
import scheduleNotifications from "./utils/bot/notifications.js";
import getTokenOfUserFromDB from "./utils/database/getToken.js";
function startCronTask(ctx) {
    
    // This class provides two methods which return student info - unsubmitted assignments
    // and active courses.
    const user = ctx.from
    const telegramId = user.id
    const token = getTokenOfUserFromDB(telegramId);
    const resources = new Resources(token);
    
    // This class creates a new cron task (but doesn't active it yet). The first argument 
    // defines a cron pattern (the time at which a given task should be executed) in the 
    // following order: Minute (0-59) | Hour (0-23) | Day (1-31) | Month (1-12) | Day of week (1-7), 
    // where "*" stands for "any". In our case, the function (second arg) will be executed
    // every day at 00:05 a.m. 
    const job = new CronJob(
        "5 0 * * *",
        async function()
        {
            // This function returns an array of objects, where each object represents one
            // unsubmitted assignment whose deadline expires in 24 hours. Each object 
            // contains the following fields: deadline, assignment name and the course 
            // the assignment belongs to.
            const assignments = await resources.getAssignments();

            // This function registers all notifications in the task queue with the help of
            // setTimeout() statements.
            scheduleNotifications(assignments, resources, ctx);
        }
    );
    
    // Activates the cron task
    job.start();
}

export default startCronTask;