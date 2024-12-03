import { bot } from "./config/integrations.js";
import { Markup } from "telegraf";
import { messages } from "./messages.js";
import Resources from "./apiResources.js";
import scheduleNotifications from "./utils/bot/notifications.js";
import startCronTask from "./cronTask.js";
import validateToken from "./utils/bot/tokenValidation.js"
import registerUserOnDB from "./utils/database/registerUser.js";
import updateTokenOfUserOnDB from "./utils/database/handleToken.js";
import getTokenOfUserFromDB from "./utils/database/getToken.js";
import updateUserNotificationTime from "./utils/database/updateUserNotificationTime.js";
import scheduleNotificationsForAllUsers from "./utils/bot/scheduleNotificationsForAllUsers.js";
import checkForTokenExpirationCronTask from "./utils/bot/checkForTokenExpirationCronTask.js";
import getUserNotificationTime from "./utils/database/getUserNotificationTime.js";
import convertHtmlToPdf from "./utils/convertHtmlToPdf.js";
import formatNotificationMessage from "./utils/bot/formatNotificationMessage.js";
import fs from "fs";

async function main() {

    await checkForTokenExpirationCronTask();
    await scheduleNotificationsForAllUsers();

    bot.start(async (ctx) => {

        const user = ctx.from;

        await registerUserOnDB(user);
        await ctx.reply(
            messages.greeting,
            Markup.keyboard([
                ["⚙️ Set up the bot"]
            ])  
            .resize()
        );

    });

    bot.hears("⚙️ Set up the bot", async (ctx) => {

        const user = ctx.from;

        await registerUserOnDB(user);
        await ctx.replyWithHTML(
            messages.guide,
            Markup.keyboard([
                ["🔑 Enter my token"]
            ])
            .resize()
            .oneTime()
        );

    });

    bot.hears("🔑 Enter my token", async (ctx) => {

        const user = ctx.from;

        await registerUserOnDB(user);
        await ctx.reply(
            "Send us your token: ",
            {
                reply_markup: {
                    force_reply: true,
                    input_field_placeholder: "Paste your token"
                }
            }
        );

    });

    bot.hears("🔑 Enter my new token", async (ctx) => {

        const user = ctx.from;

        await registerUserOnDB(user);
        await ctx.reply(
            "Send us your new token:",
            {
                reply_markup: {
                    force_reply: true,
                    input_field_placeholder: "Paste your token"
                }
            }
        );

    });

    bot.hears("🔄 Update token", async (ctx) => {

        const user = ctx.from;

        await registerUserOnDB(user);
        await ctx.replyWithHTML(
            messages.updateTokenGuide, 
            Markup.keyboard([
                ["🔑 Enter my new token"],
                ["🏠 Main menu"]
            ])
            .resize()
        );

    });

    bot.hears("🏠 Main menu", async (ctx) => {

        const mainKeyboard = Markup.keyboard([
            ["🔄 Update token", "🔔 Notifications"],
            ["⏳ Today's deadlines"]
        ]).resize()
        
        ctx.reply(
            'Back to the main menu:', 
            mainKeyboard,
        );

    });

    bot.hears("🔔 Notifications", async (ctx) => {

        const userNotificationTime = await getUserNotificationTime(ctx.from.id);

        ctx.reply(
            "You can adjust how many hours in advance you'd " +
            "like to be notified before the deadline expires: ",
            Markup.inlineKeyboard([
                Markup.button.callback(
                    userNotificationTime === 6 ? "✅ 6 hours" : "6 hours",
                    userNotificationTime === 6 ? "disabled" : "6_hours"
                ),
			    Markup.button.callback(
                    userNotificationTime === 12 ? "✅ 12 hours" : "12 hours",
                    userNotificationTime === 12 ? "disabled" : "12_hours"
                ),
                Markup.button.callback(
                    userNotificationTime === 24 ? "✅ 24 hours" : "24 hours",
                    userNotificationTime === 24 ? "disabled" : "24_hours"
                )
            ])
        );

    });

    bot.on("callback_query", async (ctx) => {

        const telegramId = ctx.from.id;
        const callbackData = ctx.callbackQuery.data;
        
        if (callbackData !== "disabled") {

            if (callbackData === "6_hours") {

                await updateUserNotificationTime(telegramId, 6);
                await ctx.editMessageReplyMarkup({
                    inline_keyboard: [[
                        Markup.button.callback(
                            "✅ 6 hours", "disabled"
                        ),
                        Markup.button.callback(
                            "12 hours", "12_hours"
                        ),
                        Markup.button.callback(
                            "24 hours", "24_hours"
                        )
                    ]]
                });
    
            } else if (callbackData === "12_hours") {
    
                await updateUserNotificationTime(telegramId, 12);
                await ctx.editMessageReplyMarkup({
                    inline_keyboard: [[
                        Markup.button.callback(
                            "6 hours", "6_hours"
                        ),
                        Markup.button.callback(
                            "✅ 12 hours", "disabled"
                        ),
                        Markup.button.callback(
                            "24 hours", "24_hours"
                        )
                    ]]
                });
    
            } else if (callbackData === "24_hours") {
    
                await updateUserNotificationTime(telegramId, 24);
                await ctx.editMessageReplyMarkup({
                    inline_keyboard: [[
                        Markup.button.callback(
                            "6 hours", "6_hours"
                        ),
                        Markup.button.callback(
                            "12 hours", "12_hours"
                        ),
                        Markup.button.callback(
                            "✅ 24 hours", "disabled"
                        )
                    ]]
                });
    
            }
    
            const token = await getTokenOfUserFromDB(telegramId);
            const resources = new Resources(token, telegramId);
            const assignments = await resources.getAssignments();
    
            if (assignments.length > 0) {
    
                await scheduleNotifications(
                    assignments,
                    resources,
                    telegramId
                );
    
            }

            ctx.answerCbQuery();

        } else {

            ctx.answerCbQuery();

        }

    });

    bot.hears("⏳ Today's deadlines", async (ctx) => {

        const userID = ctx.from.id;
        const token = await getTokenOfUserFromDB(userID);
        const isTokenValid = await validateToken(token);

        if (isTokenValid == true) {

            const resources = new Resources(token, userID);
            const assignments = await resources.getAssignments();

            if (assignments.length > 0) {

                assignments.forEach(async (item, index) => {

                    await convertHtmlToPdf(item.description, userID);

                    const message = formatNotificationMessage(item);

                    await ctx.replyWithDocument(
                        { source: `./media/${userID}-assignment.pdf` },
                        { caption: message, parse_mode: "HTML" }
                    );

                    fs.unlinkSync(`./media/${userID}-assignment.pdf`);

                });

            } else {

                ctx.sendMessage("You don't have any deadlines today.");

            }

        } else {

            ctx.reply(
                "Looks like your token might have expired. " +
                "Click \"🔄 Update token\" button to refresh your token."
            );

        }

    });

    bot.on("message", async (ctx) => {

        const isUserMessageReply = ctx.update.message?.reply_to_message?.text;

        if (isUserMessageReply) {

            const CANVAS_TOKEN = ctx.text;
            const isTokenValid = await validateToken(CANVAS_TOKEN);

            if (isTokenValid) {

                await ctx.reply(
                    "✅",
                    { reply_to_message_id: ctx.message.message_id }
                );

                const userID = ctx.from.id;

                await updateTokenOfUserOnDB(userID, CANVAS_TOKEN);

                if (isUserMessageReply == "Send us your token:") {

                    await ctx.reply(
                        `The bot is up and running!\n\n` +
                        `By default, you'll receive notifications 6 hours before the deadline. ` +
                        `For example, if you have a deadline expiring at 11:59p.m, you'll be notified about it at 18:00p.m.\n\n` +
                        `You can change this by clicking "🔔 Notifications" button.`,
                        Markup.keyboard([
                            ["🔄 Update token", "🔔 Notifications"],
                            ["⏳ Today's deadlines"]
                        ])
                        .resize()
                    );

                } else if (isUserMessageReply == "Send us your new token:") {

                    await ctx.reply(
                        `You have updated your token successfully! ` +
                        `You'll start receiving notifications from our bot again.`,
                        Markup.keyboard([
                            ["🔄 Update token", "🔔 Notifications"],
                            ["⏳ Today's deadlines"]
                        ])
                        .resize()
                    );

                }

                await startCronTask(userID);

                const resources = new Resources(CANVAS_TOKEN, userID);
                const assignments = await resources.getAssignments();

                if (assignments.length > 0) {

                    scheduleNotifications(
                        assignments, 
                        resources, 
                        userID
                    );

                }

            } else {

                await ctx.reply(
                    "❌",
                    { reply_to_message_id: ctx.message.message_id }
                );

                await ctx.reply(
                    "Looks like something is wrong with your token. " +
                    "To fix the problem:\n\n1. Regenerate your token.\n\n" +
                    "2. Make sure you have set the appropriate expiration date for your token.\n\n" +
                    "3. Make sure you have copied your token correctly.\n\n" +
                    "4. Click \"🔑 Enter my token\" button and then send your token.\n\n\n" +
                    "If the error persists, feel free to contact us at @abbos_shodiev or @javoxirone.",
                    Markup.keyboard([["🔑 Enter my token"]])
                    .resize()
                );

            }

        } else {

            ctx.deleteMessage(ctx.update.message.message_id);

        }
        
    });

    bot.launch();
}

main();


