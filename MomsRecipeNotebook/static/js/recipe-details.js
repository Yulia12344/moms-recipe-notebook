const countryCodes = {
"American": "us", "British": "gb", "Canadian": "ca", "Chinese": "cn",
"Croatian": "hr", "Dutch": "nl", "Egyptian": "eg", "French": "fr",
"Greek": "gr", "Indian": "in", "Irish": "ie", "Italian": "it",
"Jamaican": "jm", "Japanese": "jp", "Kenyan": "ke", "Malaysian": "my",
"Mexican": "mx", "Moroccan": "ma", "Polish": "pl", "Portuguese": "pt",
"Russian": "ru", "Spanish": "es", "Thai": "th", "Tunisian": "tn",
"Turkish": "tr", "Vietnamese": "vn"
};

const container = document.getElementById("recipeContainer");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
container.innerHTML = `
  <div class="error">
    <h2>❌ Ідентифікатор страви не передано.</h2>
    <p><a href="all-recipes.html">← Повернутись до списку страв</a></p>
  </div>
`;
} else {
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then(res => res.json())
  .then(data => {
    const meal = data.meals[0];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push({ name: ing.trim(), measure: measure.trim() });
      }
    }
    const country = meal.strArea;
    const flagCode = countryCodes[country] || "";
    const flagHtml = flagCode ? `<img class="flag" src="https://flagcdn.com/48x36/${flagCode}.png" alt="${country}">` : "";
    const liked = localStorage.getItem(`liked_${id}`) === "true";

    container.innerHTML = `
      <div class="recipe-container">
        <div class="recipe-header">
          <img class="main" src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="recipe-meta">
            <h1>${meal.strMeal}</h1>
            <p><strong>Категорія:</strong> ${meal.strCategory}</p>
            <p><strong>Країна:</strong> ${country} ${flagHtml}</p>
            <button type="button" class="like-btn" id="likeBtn">${liked ? "❤️ Вподобано" : "💕 Вподобати"}</button>
          </div>
        </div>
        <h3>Інгрідієнти:</h3>
        <div class="ingredient-grid">
          ${ingredients.map(ing => `
            <div class="ingredient-item" onclick="searchByIngredient('${ing.name}')" title="${ing.measure} ${ing.name}">
              <img src="https://www.themealdb.com/images/ingredients/${encodeURIComponent(ing.name)}.png" alt="${ing.name}">
              <div>${ing.name}</div>
            </div>
          `).join("")}
        </div>
        <h3>Інструкція:</h3>
        <p>${meal.strInstructions}</p>
      </div>
    `;

    document.getElementById("likeBtn").addEventListener("click", () => {
      const isLiked = localStorage.getItem(`liked_${id}`) === "true";
      localStorage.setItem(`liked_${id}`, !isLiked);
      document.getElementById("likeBtn").innerText = !isLiked ? "❤️ Вподобано" : "💕 Вподобати";
    });
  });
}

function searchByIngredient(ingredient) {
window.open(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`, "_blank");
}
