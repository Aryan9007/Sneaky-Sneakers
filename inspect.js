document.addEventListener('DOMContentLoaded', function () {
    // Get the shoe ID from the URL query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const shoeId = urlParams.get('id');

    // Fetch shoe details based on the ID
    fetch(`shoes.json?id=${shoeId}`)
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array with only one item matching the ID
            const shoe = data[0];

            // Populate the details in the HTML elements
            document.getElementById('shoe-image').src = shoe.photo1;
            document.getElementById('shoe-name').textContent = shoe.name;
            document.getElementById('shoe-price').textContent = shoe.price;
            document.getElementById('shoe-description').textContent = shoe.description;
            // Add more details as needed
        })
        .catch(error => console.log('Error fetching shoe details:', error));
});
