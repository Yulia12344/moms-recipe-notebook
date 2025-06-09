function showLogin() {
document.getElementById('registerForm').classList.add('hidden');
document.getElementById('loginForm').classList.remove('hidden');
}

function showRegister() {
document.getElementById('loginForm').classList.add('hidden');
document.getElementById('registerForm').classList.remove('hidden');
}

function registerUser() {
const username = document.getElementById('regUsername').value;
const email = document.getElementById('regEmail').value;
const password = document.getElementById('regPassword').value;

if (!username || !email || !password) {
  document.getElementById('registerMessage').textContent = "Заповніть усі поля!";
  document.getElementById('registerMessage').style.color = "red";
  return;
}

const user = { username, email, password };
localStorage.setItem("registeredUser", JSON.stringify(user));
document.getElementById('registerMessage').textContent = "Реєстрація успішна!";
document.getElementById('registerMessage').style.color = "green";

setTimeout(() => {
  showLogin();
}, 1500);
}

function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const stored = localStorage.getItem("registeredUser");

    if (!stored) {
      document.getElementById('loginMessage').textContent = "Користувача не знайдено.";
      document.getElementById('loginMessage').style.color = "red";
      return;
    }

const user = JSON.parse(stored);
    if (email === user.email && password === user.password) {
      document.getElementById('loginMessage').textContent = "Вхід успішний!";
      document.getElementById('loginMessage').style.color = "green";
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    } else {
      document.getElementById('loginMessage').textContent = "Невірний email або пароль.";
      document.getElementById('loginMessage').style.color = "red";
    }
}
