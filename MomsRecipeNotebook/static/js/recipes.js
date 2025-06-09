const container = document.getElementById("mealsContainer");
const alphabet = document.getElementById("alphabet");

alphabet.addEventListener("click", async (e) => {
  if (e.target.tagName !== "SPAN") return;

  const letter = e.target.textContent;
  container.innerHTML = `<div class="loading">Завантаження страв на <strong>${letter}</strong>...</div>`;

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter.toLowerCase()}`);
    const data = await response.json();

    container.innerHTML = "";

    if (data.meals) {
      data.meals.forEach(meal => {
        const card = document.createElement("a");
        card.className = "meal-card";
        card.href = `details.html?id=${meal.idMeal}`;
        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
        `;
        container.appendChild(card);
      });
    } else {
      container.innerHTML = `<div class="loading">На літеру "<strong>${letter}</strong>" не знайдено жодної страви 😢</div>`;
    }
  } catch (err) {
    container.innerHTML = `<div class="loading">⚠️ Помилка при завантаженні даних.</div>`;
    console.error(err);
  }
});
