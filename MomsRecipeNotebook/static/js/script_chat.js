const chatBtn = document.getElementById("openChatBtn");
const chatPopup = document.getElementById("chatPopup");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");

let socket;

chatBtn.onclick = () => {
  chatPopup.style.display = 'block';

  // Підключаємося до WebSocket при відкритті чату
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      appendMessage('bot', 'Привіт! Я чат-бот. Напишіть щось.');
    };

    socket.onmessage = (event) => {
      appendMessage('bot', event.data);
    };

    socket.onerror = (error) => {
      appendMessage('bot', 'Помилка з’єднання з сервером');
    };

    socket.onclose = () => {
      appendMessage('bot', 'З’єднання закрите');
    };
  }
};

function closeChat() {
  chatPopup.style.display = 'none';
  if (socket) {
    socket.close();
  }
}

function appendMessage(who, text) {
  const msg = document.createElement('div');
  msg.innerHTML = `<strong style="color:${who === 'user' ? '#2c3e50' : '#e74c3c'}">${who === 'user' ? 'Ви' : 'Бот'}:</strong> ${text}`;
  msg.style.marginBottom = '8px';
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text || !socket || socket.readyState !== WebSocket.OPEN) return;

  appendMessage('user', text);
  socket.send(text);
  chatInput.value = '';
}