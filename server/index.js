const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const JWT_SECRET = 'your_jwt_secret_key';

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 8000;

// Get all articles
app.get('/articles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Article ORDER BY Articleno ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get article by Articleno
app.get('/articles/:articleno', async (req, res) => {
  const articleno = parseInt(req.params.articleno);
  try {
    const result = await pool.query('SELECT * FROM Article WHERE Articleno = $1', [articleno]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Article not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO Users (username, password) VALUES ($1, $2)',
      [username, hashedPassword]
    );
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });

  try {
    // Find user by username
    const result = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);
    if (result.rowCount === 0)
      return res.status(401).json({ message: 'Invalid credentials' });

    const user = result.rows[0];

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
