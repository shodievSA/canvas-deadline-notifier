import { User } from "../../database/index.js";

async function updateUserNotificationTime(telegramID, hours) {

    try {

        const user = await User.findOne({
            where: { telegramId: telegramID }
        });
        user.notificationTime = hours;
    
        await user.save();

    } catch (err) {

        console.log(
            "The following error occured while updating 'notificationTime' field.",
            err
        );

    }

}

export default updateUserNotificationTime;