const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the SQLite database
const db = new sqlite3.Database('./accommodation.db', (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log('Connected to accommodation.db successfully.');
});

// 1. SIGNUP ROUTE: Save user into database
app.post('/api/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)`;
    
    db.run(query, [fullName, email, hashedPassword], function(err) {
      if (err) return res.status(400).json({ error: 'Email already exists or invalid data.' });
      res.status(201).json({ message: 'User registered successfully!', userId: this.lastID });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. LOGIN ROUTE: Authenticate user
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password.' });

    res.json({ message: 'Login successful!', user: { id: user.id, name: user.fullName, email: user.email } });
  });
});

// 3. ACCOMMODATIONS ROUTE: Fetch all listings from database
app.get('/api/accommodations', (req, res) => {
  const query = `SELECT * FROM accommodations`;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
