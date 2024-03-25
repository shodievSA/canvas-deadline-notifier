export const messages = {
    greeting: `-> Welcome to Canvas Deadline Notifier!\n\n` +
              `-> The goal of this project is to ensure that a student doesn't miss ` +
              `his/her assignments. To set up the bot, run the /instructions command.\n\n` +
              `-> If you have any trouble setting up the bot, feel free to reach us at either ` +
              `@abbos_shodiev or @javoxirone.`,

    guide: `-> To set up this bot, you'll need to provide your canvas token. ` +
           `-> You can obtain this token at (https://worldclassroom.webster.edu/profile/settings).\n\n` +
           `-> When the webpage loads, scroll down until you see the <b>New Access Token</b> button. ` +
           `Click on it, and fulfill the form.\n\n` +
           `-> In the <b>Purpose</b> field, you can enter "CDN Bot" (or whatever you want). ` +
           `In the <b>Expires</b> field, you need to specify the <b>expiration date</b> of your token.\n\n` + 
           `-> Generally, we recommend setting the expiration date of your token to the end of your semester. ` +
           `Finally, click on the "Generate Token" button and copy the token.\n\n` +
           `<b>!!!</b>\n` +
           `<i>Once your token expires, the bot will <b>no longer</b> be able to send notifications about ` +
           `your deadlines. Therefore, you will need to generate a new token</i>.\n` +
           `<b>!!!</b>\n\n` +
           `-> After you have copied the token, run the /set command and reply with your token.\n\n`
};