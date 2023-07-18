document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const customerPanel = document.getElementById('customerPanel');
  
    searchButton.addEventListener('click', () => {
    console.log('SearchedButton pressed');
    const searchQuery = searchInput.value.trim();
      // Clear previous search results
    customerPanel.innerHTML = '';

    // Create URLSearchParams object and add the search query
  const params = new URLSearchParams();
  params.append('firstName', searchQuery);

    // Fetch data from the server
    fetch('http://localhost:3000/customers')
    .then(response => response.json())
    .then(customers => {
      // Check if any customers found
      if (customers.length === 0) {
        const noResultsElement = document.createElement('p');
        noResultsElement.textContent = 'No customers found.';
        customerPanel.appendChild(noResultsElement);
      } else {
        // Display the search results
        customers.forEach(customer => {
          const customerElement = document.createElement('p');
          customerElement.textContent = customer.firstName;
          customerPanel.appendChild(customerElement);
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
    });
  });
  