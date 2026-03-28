const authApi = require("../api/authApi");

async function run() {
  const userName = "DEIN_USER@test.test";
  const password = "DEIN_PASSWORT";

  console.log("=== LOGIN ONLY ===");
  const res = await authApi.login(userName, password);
  console.log("STATUS:", res.status);
  console.log("DATA:", JSON.stringify(res.data, null, 2));
}

run().catch((err) => {
  console.error("LOGIN ERROR MESSAGE:", err.message);
  console.error("LOGIN ERROR CODE:", err.code);
});