import { oneDay } from "../../time.js";

function isUpcoming(deadline)
{
    // returns current time in a timestamp format
    const currentTime = new Date().getTime();

    return (deadline - currentTime <= oneDay) ? true : false;
}

export default isUpcoming;

