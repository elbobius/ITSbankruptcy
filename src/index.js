const createUserAndTransfer = require("./tests/create-user-and-transfer");
const loginLastUser = require("./tests/login-last-user");

async function main() {
    while(1){
        console.log("=== CREATE USER ===");
        await createUserAndTransfer();
    }

}

main().catch((err) => {
  console.error("FATAL:", err.message);
});