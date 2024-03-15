import { Telegraf } from "telegraf";
import { messages } from "./messages.js";
import startCronTask from "./cronTask.js";
import validateToken from "./utils/tokenValidation.js"
import 'dotenv/config';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {

    ctx.sendMessage(messages.greeting);

});

bot.command("instructions", (ctx) => {

    ctx.sendMessage(messages.guide, { parse_mode: "HTML" });

});

bot.command("set", (ctx) => {

    const replyMarkup = {
        force_reply: true,
        input_field_placeholder: "Reply with your token",
    }

    ctx.sendMessage("Enter your token:", { reply_markup: replyMarkup });

});

// Catches any messages sent by a user (apart from commands). Replies sent 
// by a user contain "reply_to_message" property. Here, we are accessing 
// this property in order to identify the bot messages the user replies 
// belong to.
bot.on("message", async (ctx) => {

    const replyTo = ctx.update.message.reply_to_message;

    if (replyTo.text === "Enter your token:") 
    {

        const CANVAS_TOKEN = ctx.text;

        // This function makes a sample request to one of the endpoints. If the 
        // status returned is ok, the function returns true. Otherwise, it returns false.
        const isTokenValid = await validateToken(CANVAS_TOKEN);

        if (isTokenValid) 
        {
            // This function starts the cron task.
            startCronTask(CANVAS_TOKEN, ctx);
            ctx.sendMessage("The bot is up and running!");
        } 
        else 
        {
            ctx.reply(
                "Hmm... looks like something is wrong with your token.",
                { reply_to_message_id: ctx.message.message_id }
            );
        }

    }
    
})

bot.launch();
