document.addEventListener('DOMContentLoaded', function() {
    const offerList = document.getElementById('offerList');
    let offers = JSON.parse(localStorage.getItem('offers')) || [];

    function renderOffers() {
        offerList.innerHTML = ''; // Clear existing content
        offers.forEach((offer, index) => {
            const offerItem = document.createElement('div');
            offerItem.className = 'offer-item';
            offerItem.innerHTML = `
                <input type="checkbox" id="offer${index}">
                <label for="offer${index}">${offer.name}</label>
                <img src="${offer.imageUrl}" alt="offer image" class="offer-image">
            `;
            offerList.appendChild(offerItem);
        });
    }

    renderOffers(); // Render offers initially

    document.getElementById('deleteBtn').addEventListener('click', function() {
        const selectedOffers = Array.from(document.querySelectorAll('#offerList input[type="checkbox"]:checked'));
        if (selectedOffers.length === 0) {
            alert("Please select at least one offer to delete.");
            return;
        }
        if (confirm("Are you sure you want to delete the selected offers?")) {
            offers = offers.filter((_, index) => !selectedOffers.some(checkbox => checkbox.id === `offer${index}`));
            localStorage.setItem('offers', JSON.stringify(offers));
            renderOffers(); // Update the displayed offers
        }
    });
});

function submitOffer() {
    const name = document.getElementById('offerName').value.trim();
    const description = document.getElementById('offerDescription').value.trim();
    const photoFile = document.getElementById('offerPhoto').files[0];

    // Check for empty fields
    if (!name || !description || !photoFile) {
        alert('Please fill in all fields .');
        return;
    }

    

    /// Additional validation patterns
    var namePattern = /^[a-z A-Z]+$/; // Field must consist only of letters
    

    // Pattern validation with specific messages
    if (!name.match(namePattern)) {
        alert('The name must consist only of letters.');
        return false;
    }
    if (!description.match(namePattern)) {
        alert('The description must consist only of letters.');
        return false;
    }

    // Proceed with file reading if validations pass
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;
        const offers = JSON.parse(localStorage.getItem('offers')) || [];
        offers.push({
            name: name,
            description: description,
            imageUrl: imageUrl
        });

        localStorage.setItem('offers', JSON.stringify(offers));
        alert('New offer added successfully!');
        window.location.href = 'Zafran_Offers.html'; // Redirect to the offers page
    };
    reader.readAsDataURL(photoFile);
}