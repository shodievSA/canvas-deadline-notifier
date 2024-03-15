export const messages = {
    greeting: `-> Welcome to Canvas Deadline Notifier!\n\n` +
              `-> The goal of this project is to ensure that a student doesn't miss ` +
              `his/her assignments. To set up the bot, run the /instructions command.\n\n` +
              `-> If you have any trouble setting up the bot, feel free to reach us at either ` +
              `@abbos_shodiev or @javoxirone.`,

    guide: `-> To set up this bot, you'll need to provide your canvas token. ` +
           `This token will be used to get the following information:\n\n` +
           `1. ID of active courses you take.\n` +
           `2. ID of assignments you have.\n\n` +
           `-> To get this token, first head over to the official canvas website ` +
           `(https://worldclassroom.webster.edu).\n\n` +
           `<b>BEFORE YOU GO</b>\n\n` +
           `If you're being redirected to the Canvas Student mobile application, ` +
           `you have two options:\n\n` +
           `1. Go to your phone settings -> applications -> Canvas Student -> disable redirection.\n\n` +
           `2. Try to access the website from another device that <b>doesn't</b> have the Canvas ` +
           `Student application installed, such as your laptop.\n\n` +
           `-> After accessing the website, click on the <b>Account</b> tab in the navigation bar. ` +
           `Next, go to <b>Settings</b> and scroll down until you see the <b>New Access Token</b> button. ` +
           `Click on it and a pop-up window will appear asking you to fulfill the form.\n\n` +
           `-> In the <b>Purpose</b> field, you can enter "CDN Bot" (or whatever you want). ` +
           `In the <b>Expires</b> field, you need to specify the <b>expiration date</b> of your token. ` + 
           `Generally, we recommend setting the expiration date to a couple of weeks. ` +
           `Finally, click on the "Generate Token" button and copy the token.\n\n` +
           `<b>!!!</b>\n` +
           `<i>Once your token expires, the bot will <b>no longer</b> be able to send notifications about ` +
           `your deadlines. Therefore, you will need to generate a new token and run the ` +
           `/update &lt;YOUR_NEW_TOKEN&gt; command to update your old token.\n\n` +
           `e.g /update 1234567890</i>\n` +
           `<b>!!!</b>\n\n` +
           `-> After you have copied the token, run the /token &lt;YOUR_TOKEN&gt; command ` +
           `to set your token.\n\n` +
           `-> e.g /token 1234567890\n\n` + 
           `-> That's it. From now on, if there is any unsubmitted assignment whose deadline ` +
           `expires in <b>6 hours</b>, you'll receive a notification about it. Enjoy the bot :D`
}