function isUpcoming(assignment) {

    const now = new Date();
    const deadline = new Date(assignment.due_at);

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();

    const deadlineYear = deadline.getFullYear();
    const deadlineMonth = deadline.getMonth();
    const deadlineDay = deadline.getDate();

    if (
        currentYear == deadlineYear 
        &&
        currentMonth == deadlineMonth
        &&
        currentDay == deadlineDay
    ) {
        return true;
    } else {
        return false;
    }
    
}

export default isUpcoming;

