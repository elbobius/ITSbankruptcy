const config = require("../config");
const transactionApi = require("../api/transactionApi");
const storeApi = require("../api/storeApi");
const userApi = require("../api/userApi");

async function runIdorChecks(currentUser = config.username, otherUser = config.otherUser) {
  console.log("\n=== IDOR: OWN DATA ===");
  await transactionApi.getTransactionHistory(currentUser);
  await storeApi.getHistory(currentUser);
  await userApi.getAvailableFunds(currentUser);
  await userApi.getProfileImage(currentUser);

  if (otherUser) {
    console.log("\n=== IDOR: OTHER USER DATA ===");
    await transactionApi.getTransactionHistory(otherUser);
    await storeApi.getHistory(otherUser);
    await userApi.getAvailableFunds(otherUser);
    await userApi.getProfileImage(otherUser);
  }

  console.log("\n=== IDOR: TRANSACTION IDS ===");
  await transactionApi.getTransaction(1);
  await transactionApi.getTransaction(2);
  await transactionApi.getTransaction(3);
}

module.exports = { runIdorChecks };

if (require.main === module) {
  runIdorChecks().catch((err) => {
    console.error("IDOR TEST ERROR:", err.message);
  });
}