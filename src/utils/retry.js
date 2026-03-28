const config = require("../config");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry(fn, name = "operation") {
  for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
    try {
      console.log(`\n🔁 ${name} Versuch ${attempt}/${config.maxRetries}`);

      const res = await fn();

      if (res && res.status === 200) {
        console.log(`✅ ${name} erfolgreich`);
        return res;
      }

      console.log(`⚠️ ${name} fehlgeschlagen (Status ${res?.status})`);
    } catch (err) {
      console.log(`❌ ${name} Error: ${err.message}`);
    }

    if (attempt < config.maxRetries) {
      await sleep(config.retryDelay);
    }
  }

  throw new Error(`${name} nach ${config.maxRetries} Versuchen fehlgeschlagen`);
}

module.exports = { retry, sleep };