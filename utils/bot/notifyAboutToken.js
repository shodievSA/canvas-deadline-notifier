import getTelegramIdOfUnauthUsers from "../database/getTelegramIdOfUnauthUsers.js";
import { bot } from "../../config/integrations.js";

async function notifyAboutToken() {
    const userList = await getTelegramIdOfUnauthUsers();
    console.log(userList)
    try {
        userList.forEach(item => {
            bot.telegram.sendMessage(
                item.telegramId,
                "You need to provide your canvas token so that the bot could notify you about your deadlines. " +
                "To learn how to obtain the token, run the /instructions command.",
                { disable_notification: true, },
            )
        })
    }
    catch (error) {
        console.error("Something went wrong!", error);
    }

}

export default notifyAboutToken;