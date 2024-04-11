import { bot } from "./config/integrations.js";
import getTelegramIdOfAllUsers from "./utils/database/getTelegramIdOfAllUsers.js";

async function handleAnnouncement() {

    const users = await getTelegramIdOfAllUsers();

    users.forEach((user) => {

        console.log(user);

        bot.telegram.sendMessage(
            user.telegramId,
            `Special thanks go to @freecaandy for ` +
            `designing the logo for this bot.`,
        );
        
    });
}


await handleAnnouncement();