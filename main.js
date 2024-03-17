import { Telegraf } from "telegraf";
import { messages } from "./messages.js";
import startCronTask from "./cronTask.js";
import validateToken from "./utils/bot/tokenValidation.js"
import registerUserOnDB from "./utils/database/registerUser.js";
import updateTokenOfUserOnDB from "./utils/database/handleToken.js";
import 'dotenv/config';


const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(async (ctx) => {
    const user = ctx.from
    await registerUserOnDB(user);
    await ctx.sendMessage(messages.greeting);

});

bot.command("instructions", async (ctx) => {
    const user = ctx.from
    await registerUserOnDB(user)
    await ctx.sendMessage(messages.guide, { parse_mode: "HTML" });

});

bot.command("set", async (ctx) => {
    const user = ctx.from
    await registerUserOnDB(user)

    const replyMarkup = {
        force_reply: true,
        input_field_placeholder: "Reply with your token",
    }

    await ctx.sendMessage("Enter your token:", { reply_markup: replyMarkup });

});

// Catches any messages sent by a user (apart from commands). Replies sent 
// by a user contain "reply_to_message" property. Here, we are accessing 
// this property in order to identify the bot messages the user replies 
// belong to.
bot.on("message", async (ctx) => {
    const user = ctx.from
    const replyTo = ctx.update.message.reply_to_message;

    if (replyTo.text === "Enter your token:") {

        const CANVAS_TOKEN = ctx.text;
        // This function makes a sample request to one of the endpoints. If the 
        // status returned is ok, the function returns true. Otherwise, it returns false.
        const isTokenValid = await validateToken(CANVAS_TOKEN);

        if (isTokenValid) {
            await updateTokenOfUserOnDB(user.id, CANVAS_TOKEN);

            // This function starts the cron task.
            await startCronTask(ctx);
            await ctx.sendMessage("The bot is up and running!");
        }
        else {
            await ctx.reply(
                "Hmm... looks like something is wrong with your token.",
                { reply_to_message_id: ctx.message.message_id }
            );
        }

    }

})

bot.launch();
