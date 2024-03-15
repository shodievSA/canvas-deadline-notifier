import { sixHours } from "../time.js";

async function scheduleNotifications(assignments, resources, ctx) {

    for (const assignment of assignments) {

        // Returns the current time in milliseconds
        const currentTime = new Date().getTime();

        // Specifies the delay of setTimeout() in milliseconds
        const delay = assignment.deadline - currentTime - sixHours;

        setTimeout(async () => {

            // Making the same request to ensure a student hasn't completed any
            // assignments the bot is about to notify about. Returns an array of assignment ids
            const assignmentIDs = await resources.getAssignments().map((obj) => {
                return obj.id;
            });

            if (assignmentIDs.includes(assignment.id)) {

                ctx.sendMessage(
                    `You have the following deadline expire in <b>6 hours</b>:\n\n` +
                    `<b>Course Name</b>: ${assignment.course}\n\n` +
                    `<b>Assignment Name</b>: ${assignment.assignment}\n\n` +
                    `<b>Hurry up!</b>`,
                    {
                        parse_mode: "HTML"
                    }
                );

            }
                
        }, delay);
    }
}

export default scheduleNotifications;
