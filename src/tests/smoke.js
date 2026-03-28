const authApi = require("../api/authApi");
const transactionApi = require("../api/transactionApi");
const storeApi = require("../api/storeApi");
const userApi = require("../api/userApi");
const searchApi = require("../api/searchApi");

async function runSmoke() {
  console.log("\n=== SMOKE: LOGIN ===");
  await authApi.login();

  console.log("\n=== SMOKE: STORE ITEMS ===");
  await storeApi.getStoreItems();

  console.log("\n=== SMOKE: FUNDS WITHOUT USER PARAM ===");
  await userApi.getAvailableFunds();

  console.log("\n=== SMOKE: SEARCH USER ===");
  await searchApi.findUser("a");

  console.log("\n=== SMOKE: PORTAL SEARCH ===");
  await searchApi.portalSearch("bank");

  console.log("\n=== SMOKE: TRANSACTION TABLE ===");
  await transactionApi.getTransactions(0, 5, "");
}

module.exports = { runSmoke };