const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.TOKEN;

// Create a bot instance and enable polling to listen for new messages
const bot = new TelegramBot(token, { polling: true });

console.log("Telegram bot has started and is polling for messages...");

// Handle the '/start' command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Define options for the custom keyboard
  const options = {
    reply_markup: {
      keyboard: [[{ text: "/start" }], [{ text: "/exit" }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };

  bot.sendMessage(chatId, "Hey, what's up?", options);
});

// Handle the '/exit' command
bot.onText(/\/exit/, (msg) => {
  const chatId = msg.chat.id;

  // Define options for the custom keyboard
  const options = {
    reply_markup: {
      keyboard: [[{ text: "/start" }], [{ text: "/exit" }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };

  bot.sendMessage(chatId, "Sorry to see you going. Bye for now.", options);
});

// Handle all other messages that are not '/start' or '/exit'
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Check if the message is not '/start' or '/exit'
  if (text !== "/start" && text !== "/exit") {
    // Send a message indicating the command is not recognized
    bot.sendMessage(
      chatId,
      "Sorry, I couldn't recognize that command. Please use /start or /exit."
    );
  }
});
