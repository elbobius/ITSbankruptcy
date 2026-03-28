const adminApi = require("../api/adminApi");

async function runAuthzChecks() {
  console.log("\n=== AUTHZ: ADMIN USERS ===");
  await adminApi.getAllUsers();

  console.log("\n=== AUTHZ: ADMIN TRANSACTIONS ===");
  await adminApi.getTransactions();

  console.log("\n=== AUTHZ: ADMIN STORE ITEMS ===");
  await adminApi.getAdminStoreItems();

  console.log("\n=== AUTHZ: ADMIN PURCHASES ===");
  await adminApi.getAllPurchases();

  console.log("\n=== AUTHZ: ADMIN STORE ITEM BY ID ===");
  await adminApi.getAdminStoreItem(1);
}

module.exports = { runAuthzChecks };

if (require.main === module) {
  runAuthzChecks().catch((err) => {
    console.error("AUTHZ TEST ERROR:", err.message);
  });
}