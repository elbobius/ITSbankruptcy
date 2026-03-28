const { client } = require("../httpClient");

async function getAllUsers() {
  return client.get("/api/Admin/GetAllUsers");
}

async function getTransactions() {
  return client.get("/api/Admin/Transactions");
}

async function getAdminStoreItems() {
  return client.get("/api/AdminStore/GetStoreItems");
}

async function getAllPurchases() {
  return client.get("/api/AdminStore/GetAllPurchases");
}

async function getAdminStoreItem(id) {
  return client.get(`/api/AdminStore/Get/${id}`);
}

async function createAdminStoreItem(payload) {
  return client.post("/api/AdminStore/Create", payload);
}

async function editAdminStoreItem(id, payload) {
  return client.post(`/api/AdminStore/Edit/${id}`, payload);
}

async function deleteAdminStoreItem(payload) {
  return client.post("/api/AdminStore/DeleteStoreItem", payload);
}

module.exports = {
  getAllUsers,
  getTransactions,
  getAdminStoreItems,
  getAllPurchases,
  getAdminStoreItem,
  createAdminStoreItem,
  editAdminStoreItem,
  deleteAdminStoreItem,
};