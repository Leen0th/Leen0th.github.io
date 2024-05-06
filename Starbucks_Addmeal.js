// Retrieve meals from local storage or create an empty array if none exist
function getStoredMeals() {
    let meals = localStorage.getItem("meals");
    return meals ? JSON.parse(meals) : [];
}

// Save a new meal to local storage
function saveMeal(newMeal) {
    const meals = getStoredMeals();
    meals.push(newMeal);
    localStorage.setItem("meals", JSON.stringify(meals));
}

// Function to validate and collect form data, and save a new meal
function validateForm() {
    // Retrieve form field values
    const mealName = document.getElementById("mealName").value.trim();
    const mealCalories = document.getElementById("mealCalories").value.trim();
    const mealPrice = document.getElementById("mealPrice").value.trim();
    const description = document.getElementById("description").value.trim();
    const mealPhotoInput = document.getElementById("mealPhoto");

    // Field names and corresponding data values
    let fieldNames = ["meal name", "meal calories", "meal price", "description", "meal photo"];
    let allFields = [mealName, mealCalories, mealPrice, description, mealPhotoInput.files[0]];
    let errors = [];

    // Check each field for emptiness and gather errors
    allFields.forEach((field, index) => {
        if ((index < 4 && field === "") || (index === 4 && !field)) {
            errors.push(`Please fill in the ${fieldNames[index]}.`);
        }
    });

    // Display alerts based on found errors
    if (errors.length > 0) {
        alert(errors.join("\n")); // Join all error messages with a new line
        return false;
    }

    // Additional validation patterns
    var namePattern = /^[a-zA-Z\s]+$/; // Letters and spaces only
    var numericPattern = /^[0-9]+$/; // Numeric values only

    // Pattern validation with specific messages
    if (!mealName.match(namePattern)) {
        alert('Meal name must consist only of letters and spaces.');
        return false;
    }
    if (!mealCalories.match(numericPattern)) {
        alert('Calories must be a numeric value.');
        return false;
    }
    if (!mealPrice.match(numericPattern)) {
        alert('Meal price must be a numeric value.');
        return false;
    }

    if (!description.match(namePattern)) {
        alert('description must consist only of letters and spaces.');
        return false;
    }

    // Process the image file (converting to Base64 for simplicity in this example)
    const reader = new FileReader();
    reader.onload = function (event) {
        const mealPhoto = event.target.result;

        // Create a meal object with all the collected data
        const newMeal = {
            name: mealName,
            calories: mealCalories,
            price: mealPrice,
            description: description,
            photo: mealPhoto
        };

        // Save the meal object to local storage
        saveMeal(newMeal);

        // Alert user about the new meal
        if (confirm(`Meal "${mealName}" has been added successfully! Click "OK" to go to the dashboard.`)) {
            window.location.href = "Starbucks_Owner.html"; // Redirect to the Owner Dashboard
        }

        // Clear the form fields after successful submission
        document.getElementById("mealName").value = '';
        document.getElementById("mealCalories").value = '';
        document.getElementById("mealPrice").value = '';
        document.getElementById("description").value = '';
        mealPhotoInput.value = ''; // Clear the file input field
    };

    // Read the image file as Data URL
    reader.readAsDataURL(mealPhotoInput.files[0]);
    return false;  // Prevent form submission
}