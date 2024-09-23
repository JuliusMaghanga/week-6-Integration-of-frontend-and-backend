const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Require path module

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB (without deprecated options)
mongoose.connect('mongodb://localhost:27017/expense_tracker')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Expense Tracker!');
});

// Serve registration page
app.get('/register', (req, res) => {
    res.send(`
        <form action="/register" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    `);
});

// Handle registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // Add user registration logic here
    res.send('User registered successfully!');
});

// API route for transactions
app.get('/api/transactions', (req, res) => {
    const transactions = [
        { date: '2024-09-23', amount: 50, category: 'Food' },
        { date: '2024-09-22', amount: 20, category: 'Transport' }
    ];
    res.json(transactions);
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
