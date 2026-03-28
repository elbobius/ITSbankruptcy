const config = require("./config");
const authApi = require("./api/authApi");
const { runSmoke } = require("./tests/smoke");
const { runAuthzChecks } = require("./tests/authz");
const { runIdorChecks } = require("./tests/idor-checks");
const state = require("./state");

async function main() {
  console.log("=== START ===");

  const loginRes = await authApi.login();

  if (loginRes.status !== 200) {
    console.error("Login fehlgeschlagen.");
    return;
  }

  console.log("\n=== LOGIN OK ===");
  console.log("Aktueller User:", state.currentUser || config.username);
  console.log("Token vorhanden:", !!state.token);
  console.log("Cookie aus Body vorhanden:", !!state.cookie);

  await runSmoke();
  await runAuthzChecks();
  await runIdorChecks(state.currentUser || config.username, config.otherUser);

  console.log("\n=== DONE ===");
}

main().catch((err) => {
  console.error("FATAL ERROR:", err.message);
});