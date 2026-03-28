const fs = require("fs");
const path = require("path");

const STORE_PATH = path.join(__dirname, "..", "last-user.json");

function saveLastUser(user) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(user, null, 2), "utf8");
}

function loadLastUser() {
  if (!fs.existsSync(STORE_PATH)) {
    return null;
  }

  const raw = fs.readFileSync(STORE_PATH, "utf8");
  return JSON.parse(raw);
}

module.exports = {
  saveLastUser,
  loadLastUser,
  STORE_PATH,
};