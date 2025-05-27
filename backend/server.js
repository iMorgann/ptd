const express = require('express');
const { validateLogin } = require('./api');
const app = express();
const port = 3000;

app.use(express.json());

// Enable CORS for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  const result = await validateLogin(req, username, password);
  if (result.success) {
    res.json({ success: true, redirectUrl: result.redirectUrl });
  } else {
    res.json({ success: false, message: 'Login failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});