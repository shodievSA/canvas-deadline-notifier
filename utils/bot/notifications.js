import { sixHours } from "../../time.js";
import { bot } from "../../config/integrations.js";

async function scheduleNotifications(assignments, resources, telegramId) {

    for (const assignment of assignments) {

        const currentTime = new Date().getTime();
        const deadline = Date.parse(assignment.deadline);

        const delay = deadline - currentTime - sixHours;

        setTimeout(async () => {

            const assignmentIDs = (await resources.getAssignments()).map((obj) => obj.id);

            if (assignmentIDs.includes(assignment.id)) {
                const deadline = new Date(assignment.deadline)
                let date = deadline.toDateString();
                date = `${date} ${String(deadline.getHours())}:${String(deadline.getMinutes())}`;
                bot.telegram.sendMessage(
                    telegramId,
                    `You have the following deadline expire in <b>6 hours</b>:\n\n` +
                    `<b>Course Name</b>: ${assignment.course}\n\n` +
                    `<b>Assignment Name</b>: ${assignment.assignment}\n\n` +
                    `<b>Deadline</b>: ${date}\n\n` +
                    `<b>Hurry up!</b>`,
                    {
                        parse_mode: "HTML"
                    }
                );

            };

        }, delay);
    };
};

export default scheduleNotifications;
