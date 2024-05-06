document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.bx-star');

    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            // Set all previous stars including the clicked one to active
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('active');
            }
            // Remove active class from subsequent stars
            for (let j = index + 1; j < stars.length; j++) {
                stars[j].classList.remove('active');
            }
        });
    });

        document.querySelector('.btn.submit').addEventListener('click', function(event) {
        event.preventDefault();  
        const restaurantList = document.getElementById('restaurantList');
        const ratingValue = Array.from(stars).filter(star => star.classList.contains('active')).length;

        // Check if a restaurant is selected and a rating is given
        if (restaurantList.value === "") {
            alert("Please choose a restaurant to rate.");
        } else if (ratingValue === 0) {
            alert("Please select a rating.");
        } else {
            // All conditions met, display an alert message
            alert(`Thank you for your feedback!\nYour rating for restaurant ${restaurantList.options[restaurantList.selectedIndex].text} is ${ratingValue}`);
            // Redirect to homepage
            window.location.href = "Homepage.html";
        }
    });
});
