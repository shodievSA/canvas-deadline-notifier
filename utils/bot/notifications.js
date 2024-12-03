import { bot } from "../../config/integrations.js";
import getUserNotificationTime from "../database/getUserNotificationTime.js";
import formatNotificationMessage from "./formatNotificationMessage.js";
import convertHtmlToPdf from "../convertHtmlToPdf.js";
import fs from "fs";

async function scheduleNotifications(assignments, resources, telegramId) {

    const userNotificationTime_before = await getUserNotificationTime(telegramId);

    for (const assignment of assignments) {

        const currentTime = new Date().getTime();
        const deadline = Date.parse(assignment.deadline);

        const delay = deadline - currentTime - (userNotificationTime_before * 60 * 60 * 1000);

        setTimeout(async () => {

            const userNotificationTime_after = await getUserNotificationTime(telegramId);

            if (userNotificationTime_after == userNotificationTime_before) {

                const assignmentIDs = (await resources.getAssignments()).map((obj) => obj.id);

                if (assignmentIDs.includes(assignment.id)) {

                    await convertHtmlToPdf(
                        assignment.description,
                        telegramId
                    );

                    const message = formatNotificationMessage(assignment);

                    await bot.telegram.sendDocument(
                        telegramId, 
                        {
                            source: `media/${telegramId}-assignment.pdf`
                        },
                        { 
                            caption: message,
                            parse_mode: "HTML" 
                        }
                    );

                    fs.unlinkSync(`./media/${telegramId}-assignment.pdf`);

                };

            }

        }, delay);
        
    }

};

export default scheduleNotifications;
