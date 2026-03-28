const authApi = require("../api/authApi");
const transactionApi = require("../api/transactionApi");
const { retry, sleep } = require("../utils/retry");

async function run() {
  const newUser = {
    id: 0,
    userName: `test_${Date.now()}@test.test`,
    password: "stsdfsdfring",
    name: "csdffsdf",
    surname: "strisdfsdfng",
    userRight: 99,
    cookie: "",
    status: "",
    siteAction: "",
    token: ""
  };

  console.log("\n=== REGISTER ===");

  await retry(
    () => authApi.register(newUser),
    "REGISTER"
  );

  console.log("\n=== LOGIN ===");

  await retry(
    () => authApi.login(newUser.userName, newUser.password),
    "LOGIN"
  );

  console.log("\n=== CREATE TRANSACTION ===");

  const txPayload = {
    id: 0,
    senderId: newUser.userName,
    receiverId: "mert.schmutzgelder@gmail.com",
    transactionDateTime: new Date().toISOString(),
    reason: "FH Test",
    amount: 100,
    reference: "Pentest"
  };

  await retry(
    () => transactionApi.createTransaction(txPayload),
    "TRANSACTION"
  );

  console.log("\n🎉 FLOW ERFOLGREICH DURCHGELAUFEN");
}

module.exports = run;

if (require.main === module) {
  run().catch(err => {
    console.error("FATAL:", err.message);
  });
}