require("dotenv").config();

module.exports = {
  baseUrl: process.env.BASE_URL || "",
  loginPath: process.env.LOGIN_PATH || "/api/Auth/Login",
  username: process.env.USERNAME || "",
  password: process.env.PASSWORD || "",
  token: process.env.TOKEN || "",
  otherUser: process.env.OTHER_USER || "",
};