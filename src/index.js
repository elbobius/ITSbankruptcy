const createUserAndTransfer = require("./tests/create-user-and-transfer");
const loginLastUser = require("./tests/login-last-user");

async function main() {
  console.log("=== CREATE USER ===");
  await createUserAndTransfer();

  console.log("\n=== LOGIN SAVED USER ===");
  await loginLastUser();
}

main().catch((err) => {
  console.error("FATAL:", err.message);
});