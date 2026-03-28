const authApi = require("../api/authApi");
const transactionApi = require("../api/transactionApi");

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
  const registerRes = await authApi.register(newUser);
  console.log("REGISTER STATUS:", registerRes.status);
  console.log("REGISTER RESPONSE:", JSON.stringify(registerRes.data, null, 2));

  if (registerRes.status !== 200) {
    console.log("Register fehlgeschlagen.");
    return;
  }

  console.log("\n=== LOGIN ===");
  const loginRes = await authApi.login(newUser.userName, newUser.password);
  console.log("LOGIN STATUS:", loginRes.status);
  console.log("LOGIN RESPONSE:", JSON.stringify(loginRes.data, null, 2));

  if (loginRes.status !== 200) {
    console.log("Login fehlgeschlagen.");
    return;
  }

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

  console.log("TX PAYLOAD:", JSON.stringify(txPayload, null, 2));

  const txRes = await transactionApi.createTransaction(txPayload);
  console.log("TRANSACTION STATUS:", txRes.status);
  console.log("TRANSACTION RESPONSE:", JSON.stringify(txRes.data, null, 2));
}

module.exports = run;

if (require.main === module) {
  run().catch((err) => {
    console.error("ERROR:", err.message);
  });
}