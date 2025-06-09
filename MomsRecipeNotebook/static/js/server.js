// server.js
const WebSocket = require('ws');

const replies = {
  "hi": "Hello! How can I assist you?",
  "how are you": "I'm doing well, thanks for asking!",
  "what do you recommend": "Try lasagna or chicken in creamy sauce – both are delicious!",
  "help": "Please visit the 'Contact' page for assistance.",
  "dessert": "How about Apple Pie or Tiramisu? 🍰",
  "desserts": "Apple Pie, Tiramisu, or Chocolate Mousse – all delicious options!",
  "meat": "Try Beef Stroganoff or Chicken Kiev!",
  "soup": "Tomato soup or mushroom cream soup are great!",
  "thank you": "You're welcome! Happy cooking! 😊"
};

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const text = message.toString().toLowerCase();
    let response = "Вибач, я не розумію. Спробуй інакше.";
    for (const key in replies) {
      if (text.includes(key)) {
        response = replies[key];
        break;
      }
    }
    ws.send(response);
  });
});

console.log('WebSocket server started on ws://localhost:8080');
