const userData = localStorage.getItem("registeredUser");

if (userData) {
  const user = JSON.parse(userData);
  document.getElementById("accountName").textContent = `Ім’я: ${user.username}`;
  document.getElementById("accountEmail").textContent = `Email: ${user.email}`;
} else {
  window.location.href = "register.html";
}

function logout() {
  localStorage.removeItem("registeredUser");
  window.location.href = "register.html";
}

function searchMeal() {
  alert("Пошук на цій сторінці тимчасово неактивний.");
}

const savedList = JSON.parse(localStorage.getItem("savedMeals")) || [];
const ul = document.getElementById("savedMeals");

if (savedList.length === 0) {
  ul.innerHTML = "<li>Немає збережених страв.</li>";
} else {
  savedList.forEach(meal => {
    const li = document.createElement("li");
    li.textContent = meal;
    ul.appendChild(li);
  });
}
