const { client } = require("../httpClient");
const config = require("../config");
const state = require("../state");

async function login(userName = config.username, password = config.password) {
  const res = await client.post(config.loginPath, {
    userName,
    password,
  });

  if (res.data && typeof res.data === "object") {
    if (res.data.token) {
      state.token = res.data.token;
    }

    if (res.data.cookie) {
      state.cookie = res.data.cookie;
    }

    if (res.data.userName) {
      state.currentUser = res.data.userName;
    }
  }

  return res;
}

async function logout() {
  return client.get("/api/Auth/Logout");
}

async function register(payload) {
  return client.post("/api/Auth/Register", payload);
}

async function passwordRecovery(payload) {
  return client.post("/api/Auth/PasswordRecovery", payload);
}

async function recover(payload) {
  return client.post("/api/Auth/Recover", payload);
}

module.exports = {
  login,
  logout,
  register,
  passwordRecovery,
  recover,
};