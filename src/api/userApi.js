const { client } = require("../httpClient");

async function getProfileImage(user) {
  return client.get("/api/User/ProfileImage", {
    params: { user },
  });
}

async function setProfileImage(username, imageUrl) {
  return client.post("/api/User/ProfileImage", {
    username,
    imageUrl,
  });
}

async function getAvailableFunds(user) {
  return client.get("/api/User/GetAvailableFunds", {
    params: { user },
  });
}

module.exports = {
  getProfileImage,
  setProfileImage,
  getAvailableFunds,
};