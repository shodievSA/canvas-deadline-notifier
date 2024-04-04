import { bot } from "./config/integrations.js";
import getTelegramIdOfAllUsers from "./utils/database/getTelegramIdOfAllUsers.js";

async function handleAnnouncement() {
    const users = await getTelegramIdOfAllUsers();
    users.forEach(user => {
        console.log(user);
        bot.telegram.sendMessage(
            user.telegramId,
            "<b>NEW UPDATE</b>\n\n" +
            "We have added the following features:\n\n" +
            "1. View all available bot commands through the menu button.\n\n" +
            "2. Get a list of your deadlines that expire within one day through the <b>/deadlines</b> command.",
            {
                parse_mode: "HTML"
            }
        )
    })
}


await handleAnnouncement();