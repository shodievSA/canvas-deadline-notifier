import { bot } from "./config/integrations.js";
import { messages } from "./messages.js";
import Resources from "./apiResources.js";
import scheduleNotifications from "./utils/bot/notifications.js";
import startCronTask from "./cronTask.js";
import validateToken from "./utils/bot/tokenValidation.js"
import registerUserOnDB from "./utils/database/registerUser.js";
import updateTokenOfUserOnDB from "./utils/database/handleToken.js";
import scheduleNotificationsForAllUsers from "./utils/bot/scheduleNotificationsForAllUsers.js";



await scheduleNotificationsForAllUsers()

bot.start(async (ctx) => {

    const user = ctx.from;

    await registerUserOnDB(user);
    await ctx.sendMessage(messages.greeting);

});

bot.command("instructions", async (ctx) => {

    const user = ctx.from;

    await registerUserOnDB(user);
    await ctx.sendMessage(messages.guide, { parse_mode: "HTML" });

});

bot.command("set", async (ctx) => {

    const user = ctx.from;

    const replyMarkup = {
        force_reply: true,
        input_field_placeholder: "Reply with your token"
    };

    await registerUserOnDB(user);
    await ctx.sendMessage("Enter your token:", { reply_markup: replyMarkup });

});

bot.on("message", async (ctx) => {

    const replyTo = ctx.update.message?.reply_to_message?.text;

    if (replyTo && replyTo == "Enter your token:") {

        const CANVAS_TOKEN = ctx.text;
        const isTokenValid = await validateToken(CANVAS_TOKEN);

        if (isTokenValid) {

            const userID = ctx.from.id;

            await updateTokenOfUserOnDB(userID, CANVAS_TOKEN);
            await startCronTask(userID, ctx);

            const resources = new Resources(CANVAS_TOKEN, userID);
            const assignments = await resources.getAssignments();
            scheduleNotifications(assignments, resources, ctx);

            await ctx.sendMessage("The bot is up and running!");

        } else {

            await ctx.reply(
                "Hmm... looks like something is wrong with your token.",
                { reply_to_message_id: ctx.message.message_id }
            );

        }

    } else {

        ctx.deleteMessage(ctx.message.message_id);

    }

});

bot.launch();
