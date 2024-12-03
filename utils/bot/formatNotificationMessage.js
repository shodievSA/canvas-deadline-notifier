function formatNotificationMessage(item) {

    const { course, assignment } = item;
    const deadline = new Date(item.deadline);

    let date = deadline.toDateString();
    date = `${date} ${String(deadline.getHours())}:${String(deadline.getMinutes())}`;

    const message = `<strong>Course Name:</strong> ${course}\n\n` +
                    `<strong>Assignment Name:</strong> ${assignment}\n\n` +
                    `<strong>Deadline:</strong> ${date}\n\n\n` +
                    "You can use @bilagon_ai_bot to complete your assignment and @turniCheck_bot to check your work against Turnitin.";

    return message;
    
}

export default formatNotificationMessage;