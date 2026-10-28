const sqlite3 = require('sqlite3').verbose();

// This will create a database file named 'accommodation.db' in your folder
const db = new sqlite3.Database('./accommodation.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database successfully!');
  }
});

// Create tables when the database runs
db.serialize(() => {
  // 1. Users Table (For Sign up & Login)
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`, (err) => {
    if (err) console.error("Error creating users table:", err.message);
    else console.log("Users table created (or already exists).");
  });

  // 2. Accommodations Table (For Flora Park, Fauna Park, Serala View, Seshego, etc.)
  db.run(`CREATE TABLE IF NOT EXISTS accommodations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    suburb TEXT NOT NULL,
    priceRange TEXT NOT NULL,
    description TEXT,
    contact TEXT
  )`, (err) => {
    if (err) console.error("Error creating accommodations table:", err.message);
    else console.log("Accommodations table created (or already exists).");
  });
});

// Close the database connection safely
db.close((err) => {
  if (err) console.error('Error closing database', err.message);
  else console.log('Database connection closed.');
});
