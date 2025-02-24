# Canvas Deadline Notifier

A Telegram bot that helps students keep track of their Canvas assignments by sending timely notifications about upcoming deadlines.

## Features

-   **Automated Notifications:** Receive notifications directly in Telegram about your upcoming Canvas assignments.
-   **Customizable Notification Time:** Adjust the notification time to receive alerts a specific number of hours before the deadline.
-   **Token-Based Authentication:** Securely connect to your Canvas account using an access token.
-   **Daily Deadline Summary:** Get a summary of all assignments due on the current day.
-   **Token Expiration Check**: The bot automatically checks for token expiration and notifies users to update their tokens.

## Setup Instructions

Follow these steps to set up and run the Canvas Deadline Notifier bot.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Redis](https://redis.io/)

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/shodievSA/canvas-deadline-notifier.git
    cd canvas-deadline-notifier
    ```

2.  **Install Dependencies**

    Using npm:

    ```bash
    npm install
    ```

    Using Yarn:

    ```bash
    yarn install
    ```

3.  **Set up Environment Variables**

    Create a `.env` file in the root directory of the project and add the following environment variables:

    ```env
    TELEGRAM_BOT_TOKEN=<YOUR_TELEGRAM_BOT_TOKEN>
    DB_USER=<YOUR_POSTGRESQL_USER>
    DB_PASSWORD=<YOUR_POSTGRESQL_PASSWORD>
    DB_HOST=<YOUR_POSTGRESQL_HOST>
    DB_NAME=<YOUR_POSTGRESQL_DATABASE_NAME>
    ```

    -   `TELEGRAM_BOT_TOKEN`:  You can obtain this token from [BotFather](https://t.me/botfather) on Telegram.
    -   `DB_USER`: Your PostgreSQL username.
    -   `DB_PASSWORD`: Your PostgreSQL password.
    -   `DB_HOST`: Your PostgreSQL host address (e.g., `localhost`).
    -   `DB_NAME`: Your PostgreSQL database name.

4.  **Configure PostgreSQL**

    -   Ensure PostgreSQL is installed and running.
    -   Create a database with the name specified in the `.env` file (`DB_NAME`).
    -   The bot uses Sequelize to interact with the database, and it will automatically create the necessary tables.

5.  **Configure Redis**

    -   Ensure Redis is installed and running. The bot uses Redis for caching Canvas course data.

### Running the Project

1.  **Start the Bot**

    ```bash
    node main.js
    ```

    This command starts the Telegram bot.

## Usage

1.  **Start the Bot on Telegram:**
   - Open Telegram and start the bot by sending the `/start` command.

2.  **Set Up the Bot:**
   - Click the "⚙️ Set up the bot" button to receive instructions on how to generate a Canvas access token.

3.  **Generate a Canvas Access Token:**
   - Follow the instructions provided by the bot:
        -   Go to your [Canvas profile settings](https://worldclassroom.webster.edu/profile/settings).
        -   Scroll down and click the "+ New Access Token" button.
        -   Fill out the form, providing a purpose (e.g., "CDN Bot") and an expiration date.
        -   Click "Generate Token" and copy the generated token.

4.  **Enter Your Token:**
   - Click the "🔑 Enter my token" button in the bot and paste your Canvas access token.

5.  **Receive Notifications:**
   - The bot will now send you notifications about upcoming assignment deadlines.

### Available Commands and Features

-   **⚙️ Set up the bot:** Provides instructions on how to set up the bot with a Canvas access token.
-   **🔑 Enter my token:** Allows you to enter your Canvas access token.
-   **🔄 Update token:** Allows you to update your Canvas access token.
-   **🔔 Notifications:** Allows you to customize the notification time (6, 12, or 24 hours before the deadline).
-   **⏳ Today's deadlines:** Retrieves and displays all assignments due on the current day.
-   **🏠 Main menu:** Navigates back to the main menu.

## Cron Tasks

The bot uses cron tasks for the following functionalities:

-   **Daily Assignment Notifications:** Sends notifications about assignments due on the current day at a specified time.
-   **Token Expiration Check:** Checks for token expiration daily and notifies users to update their tokens.

## Contributing

Contributions are welcome! Please feel free to submit pull requests, report issues, or suggest new features.
