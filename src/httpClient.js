const axios = require("axios");
const { wrapper } = require("axios-cookiejar-support");
const { CookieJar } = require("tough-cookie");
const config = require("./config");
const state = require("./state");

const jar = new CookieJar();

const client = wrapper(
  axios.create({
    baseURL: config.baseUrl,
    timeout: 60000,
    jar,
    withCredentials: true,
    validateStatus: () => true,
  })
);

client.interceptors.request.use((req) => {
  req.headers = req.headers || {};

  if (state.token) {
    req.headers.Authorization = `Bearer ${state.token}`;
  }

  console.log(`\n--> ${req.method.toUpperCase()} ${req.baseURL}${req.url}`);

  if (req.params) {
    console.log("PARAMS:", JSON.stringify(req.params, null, 2));
  }

  if (req.data) {
    console.log("BODY:", JSON.stringify(req.data, null, 2));
  }

  return req;
});

client.interceptors.response.use((res) => {
  console.log(`<-- ${res.status} ${res.config.url}`);

  if (res.data !== undefined) {
    console.log("RESPONSE:", JSON.stringify(res.data, null, 2));
  }

  return res;
});

module.exports = { client, jar };