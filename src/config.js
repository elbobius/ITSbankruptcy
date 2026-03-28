require("dotenv").config();

module.exports = {
  baseUrl: process.env.BASE_URL || "",
  loginPath: process.env.LOGIN_PATH || "/api/Auth/Login",

  username: process.env.USERNAME || "",
  password: process.env.PASSWORD || "",

  // 🔁 Retry Config
  maxRetries: parseInt(process.env.MAX_RETRIES || "50"),
  retryDelay: parseInt(process.env.RETRY_DELAY || "1000"), // ms
  requestTimeout: parseInt(process.env.REQUEST_TIMEOUT || "5000") // ms
};