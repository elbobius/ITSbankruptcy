const authApi = require("../api/authApi");
const transactionApi = require("../api/transactionApi");
const userApi = require("../api/userApi");
const { saveLastUser } = require("../userStore");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry(fn, name, maxRetries = 50, delayMs = 1000) {
  let lastErr;

  for (let i = 1; i <= maxRetries; i++) {
    try {
      console.log(`\n[${name}] Versuch ${i}/${maxRetries}`);
      const res = await fn();

      if (res && res.status === 200) {
        console.log(`[${name}] ✅ erfolgreich`);
        return res;
      }

      console.log(`[${name}] ⚠️ Status ${res?.status}`);
    } catch (err) {
      lastErr = err;
      console.log(`[${name}] ❌ ${err.message}`);
    }

    if (i < maxRetries) {
      await sleep(delayMs);
    }
  }

  throw lastErr || new Error(`${name} fehlgeschlagen`);
}

function createTestUser() {
  return {
    id: 0,
    userName: `test_${Date.now()}@test.test`,
    password: "stsdfsdfring",
    name: "race",
    surname: "test",
    userRight: 99,
    cookie: "",
    status: "",
    siteAction: "",
    token: ""
  };
}

async function run() {
  console.log("=== RACE CONDITION TEST ===");

  // 🔹 1. USER ERZEUGEN
  const newUser = createTestUser();

  await retry(
    () => authApi.register(newUser),
    "REGISTER"
  );

  console.log("User erstellt:", newUser.userName);

  // 🔹 speichern (optional für andere Tests)
  saveLastUser({
    userName: newUser.userName,
    password: newUser.password
  });

  // 🔹 2. warten (Backend braucht das!)


  // 🔹 3. LOGIN
  await retry(
    () => authApi.login(newUser.userName, newUser.password),
    "LOGIN"
  );

  console.log("Login erfolgreich");

  // 🔹 4. RACE TEST
  const receiver = process.env.RECEIVER_ID || "mert.schmutzgelder@gmail.com";
  const amount = 60;
  const parallel = Number(process.env.RACE_PARALLEL || 5);

  console.log(`\nStarte ${parallel} parallele Transaktionen...`);

  const payload = {
    id: 0,
    senderId: newUser.userName,
    receiverId: receiver,
    transactionDateTime: new Date().toISOString(),
    reason: "race test",
    amount,
    reference: "race"
  };

  const tasks = [];

  for (let i = 0; i < parallel; i++) {
    tasks.push(transactionApi.createTransaction(payload));
  }

  const results = await Promise.allSettled(tasks);

  console.log("\n=== RESULTS ===");

  results.forEach((r, i) => {
    console.log(`\nRequest ${i + 1}:`);

    if (r.status === "fulfilled") {
      console.log("Status:", r.value.status);
      console.log("Data:", r.value.data);
    } else {
      console.log("Error:", r.reason.message);
    }
  });

  // 🔹 5. CHECK HISTORY
  console.log("\n=== HISTORY CHECK ===");

  const history = await transactionApi.getTransactionHistory(newUser.userName);

  console.log("History:", JSON.stringify(history.data, null, 2));

  // 🔹 6. CHECK FUNDS
  console.log("\n=== FUNDS CHECK ===");

  const funds = await userApi.getAvailableFunds(newUser.userName);

  console.log("Funds:", JSON.stringify(funds.data, null, 2));

  console.log("\n=== DONE ===");
}

module.exports = run;

if (require.main === module) {
  run().catch(err => {
    console.error("FATAL:", err.message);
  });
}