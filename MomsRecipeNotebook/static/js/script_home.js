function goToDetails(id) {
  window.location.href = `details.html?id=${id}`;
}

async function searchMeal() {
  const query = document.getElementById('searchInput').value;
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await response.json();
  const { meals } = data;

  const section = document.getElementById('recipeSection');
  section.innerHTML = '';

  if (!meals) {
    section.innerHTML = "<p style='text-align:center;'>Нічого не знайдено 😢</p>";
    return;
  }

  meals.forEach((meal) => {
    const card = `
      <div class="recipe-card" onclick="goToDetails('${meal.idMeal}')">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="recipe-info">
          <h2>${meal.strMeal}</h2>
          <p>${meal.strInstructions.slice(0, 200)}...</p>
        </div>
      </div>
    `;
    section.innerHTML += card;
  });
}

async function loadTopMeals() {
  const topMealIds = ['52772', '52874', '52844', '52819', '52940', '52941', '52942', '52877', '52880', '52850'];
  const container = document.getElementById('topMeals');
  for (const id of topMealIds) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];
    const card = `
      <div class="meal-item" onclick="goToDetails('${meal.idMeal}')">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <strong>${meal.strMeal}</strong>
      </div>
    `;
    container.innerHTML += card;
  }
}

async function populateCountries() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const data = await res.json();
  const select = document.getElementById('countrySelect');
  data.meals.sort((a, b) => a.strArea.localeCompare(b.strArea));
  data.meals.forEach((area) => {
    const opt = document.createElement('option');
    opt.value = area.strArea;
    opt.innerText = area.strArea;
    select.appendChild(opt);
  });
}

async function loadCountryMeals() {
  const area = document.getElementById('countrySelect').value;
  const container = document.getElementById('countryMeals');
  container.innerHTML = '';

  if (!area) return;

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const data = await res.json();

  data.meals.forEach((meal) => {
    const card = `
      <div class="meal-item" onclick="goToDetails('${meal.idMeal}')">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <strong>${meal.strMeal}</strong>
      </div>
    `;
    container.innerHTML += card;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadTopMeals();
  populateCountries();
});
