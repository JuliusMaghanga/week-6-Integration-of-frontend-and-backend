// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = this.username.value.trim();
    const password = this.password.value.trim();

    // Basic validation
    if (!username || username.length < 3) {
        alert('Username must be at least 3 characters long.');
        return;
    }
    if (!password || password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Simulate a login request (replace this with actual API call)
    fetch('/api/login', { // Adjust the endpoint as needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful login
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    })
    .catch(error => {
        console.error('Error logging in:', error);
        alert('An error occurred during login. Please try again.');
    });
});

// Handle registration form submission
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = this.username.value.trim();
    const password = this.password.value.trim();

    // Basic validation
    if (!username || username.length < 3) {
        alert('Username must be at least 3 characters long.');
        return;
    }
    if (!password || password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Simulate a registration request (replace this with actual API call)
    fetch('/api/register', { // Adjust the endpoint as needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful registration
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    })
    .catch(error => {
        console.error('Error registering:', error);
        alert('An error occurred during registration. Please try again.');
    });
});

// Fetch and display transactions
fetch('/api/transactions')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayTransactions(data);
    })
    .catch(error => {
        console.error('Error fetching transactions:', error);
        alert('An error occurred while fetching transactions. Please try again later.');
    });

// Function to display transactions
function displayTransactions(transactions) {
    const transactionsContainer = document.getElementById('transactions-container');
    transactions.forEach(transaction => {
        const transactionElement = document.createElement('div');
        transactionElement.innerHTML = `
            <p>Date: ${transaction.date}</p>
            <p>Amount: $${transaction.amount}</p>
            <p>Category: ${transaction.category}</p>
        `;
        transactionsContainer.appendChild(transactionElement);
    });
}
