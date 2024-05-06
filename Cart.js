document.addEventListener("DOMContentLoaded", function () {
    // Select specific trash icon for clearing all items
    const clearAllItemsIcon = document.querySelector('.current-items-title .fa-trash-alt');
    if (clearAllItemsIcon) {
        clearAllItemsIcon.addEventListener('click', () => {
            document.querySelector('.modal-body').innerHTML = ''; // Clears the cart
            updateTotal(); // Updates the total to reflect an empty cart
        });
    }

    // Update Quantity: Increase or Decrease
    const updateCartItems = () => {
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            const decreaseButton = item.querySelector('.decrease');
            const increaseButton = item.querySelector('.increase');
            let quantityDisplay = item.querySelector('.counter-value');

            decreaseButton.addEventListener('click', () => {
                let currentQuantity = parseInt(quantityDisplay.textContent);
                if (currentQuantity > 1) {
                    quantityDisplay.textContent = currentQuantity - 1;
                }
                updateTotal();
            });

            increaseButton.addEventListener('click', () => {
                let currentQuantity = parseInt(quantityDisplay.textContent);
                quantityDisplay.textContent = currentQuantity + 1;
                updateTotal();
            });
        });
    };
    updateCartItems();

    // Delete a meal from the cart
    const updateDeleteButtons = () => {
        document.querySelectorAll('.cart-item .fa-trash-alt').forEach(button => {
            button.addEventListener('click', () => {
                const itemToRemove = button.closest('.cart-item');
                itemToRemove.remove();
                updateTotal();
            });
        });
    };
    updateDeleteButtons();

    // Clear the cart
    const clearCartButton = document.querySelector('.clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            document.querySelector('.modal-body').innerHTML = '';
            updateTotal();
        });
    }

    // Update total cost
    function updateTotal() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseInt(item.querySelector('.item-price').textContent.replace(' SR', ''));
            const quantity = parseInt(item.querySelector('.counter-value').textContent);
            total += price * quantity;
        });
        const totalDisplay = document.querySelector('.summary-total strong:nth-child(2)');
        if (totalDisplay) {
            totalDisplay.textContent = total + ' SR';
        }
    }

    // Handle checkout
    const checkoutButton = document.querySelector('.checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const totalCost = document.querySelector('.summary-total strong:nth-child(2)').textContent;
            alert(`Your total cost is ${totalCost}. Proceeding to checkout.`);
            window.location.href = 'Evaluation.html';
        });
    }
});