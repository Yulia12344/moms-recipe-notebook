/* eslint-disable */
const socket = new WebSocket('ws://localhost:3000');

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

socket.onmessage = (event) => {
  if (event.data instanceof Blob) {
    const reader = new FileReader();
    reader.onload = function () {
      appendMessage(reader.result);
    };
    reader.readAsText(event.data);
  } else {
    appendMessage(event.data);
  }
};

function appendMessage(text) {
  const message = document.createElement('div');
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (text !== '') {
    socket.send(text);
    chatInput.value = '';
  }
}
<script>
const mealCategories = {
  dessert: [
    { name: "Tiramisu", img: "https://www.themealdb.com/images/media/meals/xrxxyu1483569838.jpg" },
    { name: "Apple Pie", img: "https://www.themealdb.com/images/media/meals/1549542877.jpg" },
  ],
  meat: [
    { name: "Beef Wellington", img: "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg" },
    { name: "Chicken Alfredo", img: "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg" },
  ],
  soup: [
    { name: "Red Peas Soup", img: "https://www.themealdb.com/images/media/meals/sqpqtp1511303302.jpg" },
    { name: "Miso Soup", img: "https://www.themealdb.com/images/media/meals/miso-soup.jpg" },
  ]
};

function showCategory(category) {
  const messages = document.getElementById("chatMessages");
  const meals = mealCategories[category];

  if (!meals) {
    const error = document.createElement("div");
    error.innerHTML = `<strong style="color:red;">No meals found.</strong>`;
    messages.appendChild(error);
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.style.marginTop = "10px";

  meals.forEach(meal => {
    const mealDiv = document.createElement("div");
    mealDiv.innerHTML = `
      <strong>${meal.name}</strong><br>
      <img src="${meal.img}" alt="${meal.name}" style="width:100px; border-radius:6px; margin-bottom:10px;"><br><br>
    `;
    wrapper.appendChild(mealDiv);
  });

  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
}
</script>
