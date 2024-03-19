import { oneDay } from "../../time.js";

function isUpcoming(assignment) {

    const expiresIn = Date.parse(assignment.due_at) - new Date().getTime();
    return (expiresIn > 0 && expiresIn <= oneDay) ? true : false;
    
}

export default isUpcoming;

