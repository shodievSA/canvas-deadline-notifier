import { sixHours } from "../../time.js";

async function scheduleNotifications(assignments, resources, ctx) {

    for (const assignment of assignments) {

        const currentTime = new Date().getTime();
        const deadline = Date.parse(assignment.deadline);

        const delay = deadline - currentTime - sixHours; 

        setTimeout(async () => {

            const assignmentIDs = (await resources.getAssignments()).map((obj) => obj.id);

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

            };
                
        }, delay);
    };
};

export default scheduleNotifications;
