const { client } = require("../httpClient");

async function getTransaction(id) {
  return client.get(`/api/Transaction/Get/${id}`);
}

async function getTransactions(start = 0, length = 10, searchValue = "") {
  return client.get("/api/Transaction/GetTransactions", {
    params: {
      start,
      length,
      "search[value]": searchValue,
    },
  });
}

async function getTransactionHistory(userName) {
  return client.get("/api/Transaction/GetTransactionHistory", {
    params: { userName },
  });
}

async function createTransaction(payload) {
  return client.post("/api/Transaction/Create", payload);
}

module.exports = {
  getTransaction,
  getTransactions,
  getTransactionHistory,
  createTransaction,
};