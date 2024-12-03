import { bot } from "../../config/integrations.js";
import getUserData from "../database/getUserData.js";
import validateToken from "./tokenValidation.js";

async function checkForTokenExpirationCronTask()
{
    let usersWithCanvasToken = await getUserData();

    if (usersWithCanvasToken.length > 0)
    {
        usersWithCanvasToken.forEach(async (user) => {

            let isTokenValid = await validateToken(user.canvasToken);

            if (isTokenValid == false)
            {
                try {

                    await bot.telegram.sendMessage(
                        user.telegramId,
                        'Looks like your token might have expired. ' +
                        'Click "🔄 Update token" button to learn how to refresh your token.'
                    );

                } catch (error) {

                    console.log(error);

                }
            }

        });
    }
}

export default checkForTokenExpirationCronTask;