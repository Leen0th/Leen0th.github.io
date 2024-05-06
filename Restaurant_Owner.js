// Retrieve meals from local storage or create an empty array if none exist
function getStoredMeals() {
    let meals = localStorage.getItem("meals");
    return meals ? JSON.parse(meals) : [];
}

// Create a meal card dynamically based on the meal object
function createMealCard(meal) {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = meal.photo;
    image.alt = meal.name;
    card.appendChild(image);

    const dishNameCalories = document.createElement("div");
    dishNameCalories.className = "dish-name-calories";

    const dishName = document.createElement("div");
    dishName.className = "dish-name";
    dishName.textContent = meal.name;
    dishNameCalories.appendChild(dishName);

    const calories = document.createElement("div");
    calories.className = "calories";
    calories.textContent = `${meal.calories} kcal`;
    dishNameCalories.appendChild(calories);

    card.appendChild(dishNameCalories);

    const description = document.createElement("div");
    description.className = "description";
    description.textContent = meal.description;
    card.appendChild(description);

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `${meal.price} SR`;
    card.appendChild(price);

    return card;
}

// Function to display all meals as cards in the designated container
function displayMeals() {
    const mealContainer = document.getElementById("mealContainer");
    const meals = getStoredMeals();

    // Clear previous contents
    mealContainer.innerHTML = '';

    // Create and append meal cards
    meals.forEach(meal => {
        const card = createMealCard(meal);
        mealContainer.appendChild(card);
    });
}

// Trigger the meal display on page load
document.addEventListener("DOMContentLoaded", displayMeals);




