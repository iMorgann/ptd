const express = require('express');
const puppeteer = require('puppeteer');
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

  let browser;
  try {
    // Launch headless browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Navigate to the PenTeleData login page
    await page.goto('https://promail.ptd.net/', { waitUntil: 'networkidle2', timeout: 30000 });

    // Fill in the login form using the provided selectors
    await page.type('#username', username);
    await page.type('#password', password);

    // Click the login button and wait for navigation
    await Promise.all([
      page.click('#loginButton'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {})
    ]);

    // Check for successful login by looking at the URL or a specific element
    const currentUrl = page.url();
    const isLoggedIn = !currentUrl.includes('promail.ptd.net') || (await page.$('.zLoginFieldInput') === null);

    if (isLoggedIn) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login test:', error.message);
    res.status(500).json({ success: false, message: 'Server error during login test: ' + error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});