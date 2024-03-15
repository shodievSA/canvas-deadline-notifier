import { oneDay } from "../time.js";

function isUpcoming(deadline)
{
    // returns current time in a timestamp format
    const currentDate = new Date().getTime();

    return (deadline - currentDate <= oneDay) ? true : false;
}

export default isUpcoming;

