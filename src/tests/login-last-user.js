const authApi = require("../api/authApi");
const { loadLastUser } = require("../userStore");

async function run() {
  const lastUser = loadLastUser();

  if (!lastUser) {
    console.log("Kein gespeicherter User gefunden.");
    return;
  }

  console.log("Verwende gespeicherten User:", lastUser.userName);

  const loginRes = await authApi.login(lastUser.userName, lastUser.password);
  console.log("LOGIN STATUS:", loginRes.status);
  console.log("LOGIN RESPONSE:", JSON.stringify(loginRes.data, null, 2));
}

module.exports = run;

if (require.main === module) {
  run().catch((err) => {
    console.error("LOGIN TEST ERROR:", err.message);
  });
}