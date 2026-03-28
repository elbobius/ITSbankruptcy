const { client } = require("../httpClient");

async function getStoreItems() {
  return client.get("/api/Store/GetStoreItems");
}

async function getHistory(username) {
  return client.get("/api/Store/GetHistory", {
    params: { username },
  });
}

async function buyProduct(payload) {
  return client.post("/api/Store/BuyProduct", payload);
}

module.exports = {
  getStoreItems,
  getHistory,
  buyProduct,
};