import { bot } from "./config/integrations.js";
import getTelegramIdOfAllUsers from "./utils/database/getTelegramIdOfAllUsers.js";

async function handleAnnouncement() {

    const users = await getTelegramIdOfAllUsers();

    users.forEach((user) => {

        console.log(user);

        bot.telegram.sendMessage(
            user.telegramId,
            "ANNOUNCEMENT MESSAGE"
        );
        
    });
}
