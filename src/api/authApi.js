const { client } = require("../httpClient");
const config = require("../config");
const state = require("../state");

async function login(userName = config.username, password = config.password) {
  const res = await client.post(
    config.loginPath,
    {
      userName,
      password,
    },
    {
      timeout: 60000
    }
  );

  if (res.data && typeof res.data === "object") {
    if (res.data.token) state.token = res.data.token;
    if (res.data.cookie) state.cookie = res.data.cookie;
    if (res.data.userName) state.currentUser = res.data.userName;
  }

  return res;
}

async function register(payload) {
  return client.post("/api/Auth/Register", payload, {
    timeout: 60000
  });
}

async function logout() {
  return client.get("/api/Auth/Logout", {
    timeout: 60000
  });
}

module.exports = {
  login,
  register,
  logout,
};