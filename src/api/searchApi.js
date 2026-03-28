const { client } = require("../httpClient");

async function findUser(term) {
  return client.get("/api/Search/FindUser", {
    params: { term },
  });
}

async function portalSearch(searchString) {
  return client.get("/api/PortalSearch/Index", {
    params: { searchString },
  });
}

module.exports = {
  findUser,
  portalSearch,
};