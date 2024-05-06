function showDetails(card) {
  const description = card.querySelector('.description');
  description.style.display = 'block'; // Show description on hover
}

function hideDetails(card) {
  const description = card.querySelector('.description');
  description.style.display = 'none'; // Hide description when not hovering
}

function sortMeals() {
  var sortOption = document.getElementById('sortby').value;
  var menuCategories = document.querySelectorAll('.menu-category');

  menuCategories.forEach(menu => {
      var meals = Array.from(menu.getElementsByClassName('card'));

      meals.sort((a, b) => {
          var nameA = a.querySelector('.dish-name').innerText.toUpperCase(); // Normalize case for string comparison
          var nameB = b.querySelector('.dish-name').innerText.toUpperCase();
          var priceA = parseFloat(a.querySelector('.price').innerText.replace(/[^0-9.]/g, ''));
          var priceB = parseFloat(b.querySelector('.price').innerText.replace(/[^0-9.]/g, ''));

          switch (sortOption) {
              case 'name-asc':
                  return nameA.localeCompare(nameB);
              case 'name-desc':
                  return nameB.localeCompare(nameA);
              case 'price-asc':
                  return priceA - priceB;
              case 'price-desc':
                  return priceB - priceA;
          }
      });

      menu.innerHTML = ''; // Clear existing entries
      meals.forEach(meal => menu.appendChild(meal)); // Append sorted entries
  });
}

// Event listener for the dropdown change
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('sortby').addEventListener('change', sortMeals);
});

document.addEventListener('DOMContentLoaded', function() {
  // This function updates the displayed count.
  function updateCount(element, increment) {
      var counterValue = element.parentElement.querySelector('.counter-value');
      var currentValue = parseInt(counterValue.innerText, 10);
      if (increment) {
          currentValue += 1;
      } else if (currentValue > 1) { // Prevents the count from going below 1
          currentValue -= 1;
      }
      counterValue.innerText = currentValue;
  }

  // Attach event listeners to all increment and decrement buttons
  var increaseButtons = document.querySelectorAll('.counter-btn.increase');
  var decreaseButtons = document.querySelectorAll('.counter-btn.decrease');

  increaseButtons.forEach(button => {
      button.addEventListener('click', function() {
          updateCount(this, true);
      });
  });

  decreaseButtons.forEach(button => {
      button.addEventListener('click', function() {
          updateCount(this, false);
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');

  // Function to update the item count directly from the page or adjust from the cart page
  function updateItemCount(dishName, increment) {
      if (cart[dishName]) {
          if (increment) {
              cart[dishName].quantity++;
          } else if (cart[dishName].quantity > 1) {
              cart[dishName].quantity--;
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartDisplay();
      }
  }

  // Adding event listeners to checkbox and buttons
  document.querySelectorAll('.add-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
          const card = checkbox.closest('.card');
          const dishName = card.querySelector('.dish-name').textContent.trim();
          const price = parseFloat(card.querySelector('.price').textContent.replace(' SR', ''));
          const quantity = parseInt(card.querySelector('.counter-value').textContent);

          if (checkbox.checked) {
              cart[dishName] = { quantity, price };
          } else {
              delete cart[dishName];
          }
          localStorage.setItem('cart', JSON.stringify(cart));
      });
  });

  document.querySelectorAll('.counter-btn').forEach(button => {
      button.addEventListener('click', function() {
          const card = button.closest('.card');
          const dishName = card.querySelector('.dish-name').textContent.trim();
          updateItemCount(dishName, button.classList.contains('increase'));
      });
  });

  document.querySelector('.add-button').addEventListener('click', function() {
      window.location.href = 'KFC_Cart.html'; // Redirect to cart page
  });

  // Function to update the cart display on the Cart page
  function updateCartDisplay() {
      if (document.location.pathname.includes('KFC_Cart.html')) {
          const cartContainer = document.querySelector('.modal-body');
          cartContainer.innerHTML = ''; // Clear previous entries
          Object.entries(cart).forEach(([name, data]) => {
              const itemHTML = `
                  <div class="cart-item">
                      <div class="item-details">
                          <p class="item-name">${name}</p>
                          <p class="item-price">${data.price} SR</p>
                          <div class="item-counter">
                              <button class="counter-btn decrease">-</button>
                              <div class="counter-value">${data.quantity}</div>
                              <button class="counter-btn increase">+</button>
                          </div>
                      </div>
                  </div>
              `;
              cartContainer.innerHTML += itemHTML;
          });
          // Reattach event listeners to newly added cart items
          document.querySelectorAll('.cart-item .counter-btn').forEach(button => {
              button.addEventListener('click', function() {
                  const itemElement = button.closest('.cart-item');
                  const dishName = itemElement.querySelector('.item-name').textContent.trim();
                  updateItemCount(dishName, button.classList.contains('increase'));
              });
          });
      }
  }

  updateCartDisplay(); // Call to display cart items when page loads
});