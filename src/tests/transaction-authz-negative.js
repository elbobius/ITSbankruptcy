const authApi = require("../api/authApi");
const transactionApi = require("../api/transactionApi");
const { loadLastUser } = require("../userStore");
const config = require("../config");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry(fn, name, maxRetries = 50, delayMs = 1000) {
  let lastError = null;

  for (let i = 1; i <= maxRetries; i++) {
    try {
      console.log(`\n[${name}] Versuch ${i}/${maxRetries}`);
      const res = await fn();

      if (res) {
        return res;
      }
    } catch (err) {
      lastError = err;
      console.log(`[${name}] Fehler: ${err.message}`);
    }

    if (i < maxRetries) {
      await sleep(delayMs);
    }
  }

  if (lastError) {
    throw lastError;
  }

  throw new Error(`${name} nach ${maxRetries} Versuchen fehlgeschlagen`);
}

async function run() {
  const lastUser = loadLastUser();

  if (!lastUser) {
    console.log("Kein gespeicherter User gefunden. Erzeuge zuerst einen Testuser.");
    return;
  }

  const foreignSender = process.env.FOREIGN_SENDER || "mert.schutzgelder@gmail.com";
  const receiverId = process.env.RECEIVER_ID || "mert.schmutzgelder@gmail.com";
  const amount = Number(process.env.TEST_AMOUNT || "1");

  console.log("=== TRANSACTION AUTHZ NEGATIVE TEST ===");
  console.log("Login-User:", lastUser.userName);
  console.log("Abweichender senderId-Wert:", foreignSender);
  console.log("Empfänger:", receiverId);
  console.log("Betrag:", amount);

  const loginRes = await retry(
    () => authApi.login(lastUser.userName, lastUser.password),
    "LOGIN",
    Number(process.env.MAX_RETRIES || "50"),
    Number(process.env.RETRY_DELAY || "1000")
  );

  console.log("\nLOGIN STATUS:", loginRes.status);
  console.log("LOGIN RESPONSE:", JSON.stringify(loginRes.data, null, 2));

  if (loginRes.status !== 200) {
    console.log("Login fehlgeschlagen. Test wird beendet.");
    return;
  }

  await sleep(3000);

  const payload = {
    id: 0,
    senderId: foreignSender,
    receiverId,
    transactionDateTime: new Date().toISOString(),
    reason: "authorization negative test",
    amount,
    reference: "FH authz test"
  };

  console.log("\n=== REQUEST PAYLOAD ===");
  console.log(JSON.stringify(payload, null, 2));

  const txRes = await retry(
    () => transactionApi.createTransaction(payload),
    "TRANSACTION_CREATE",
    Number(process.env.MAX_RETRIES || "50"),
    Number(process.env.RETRY_DELAY || "1000")
  );

  console.log("\nTRANSACTION STATUS:", txRes.status);
  console.log("TRANSACTION RESPONSE:", JSON.stringify(txRes.data, null, 2));

  console.log("\n=== BEWERTUNG ===");
  if ([400, 401, 403].includes(txRes.status)) {
    console.log("OK: Der Server hat den inkonsistenten Sender abgelehnt.");
  } else if (txRes.status === 200) {
    console.log("KRITISCH: Der Server hat den Request akzeptiert. Prüfe serverseitige Bindung von senderId an die Session.");
  } else {
    console.log("Unklar: Unerwarteter Statuscode, bitte Response manuell prüfen.");
  }
}

module.exports = run;

if (require.main === module) {
  run().catch((err) => {
    console.error("FATAL:", err.message);
  });
}