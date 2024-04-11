import { CronJob } from "cron";
import notifyAboutToken from "./notifyAboutToken.js";

async function startCronTaskForTokenNotification() {

    const job = new CronJob(
        "0 12 * * *",
        notifyAboutToken,
    );

    job.start();

}

export default startCronTaskForTokenNotification;