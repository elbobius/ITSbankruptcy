const axios = require("axios");
const { wrapper } = require("axios-cookiejar-support");
const { CookieJar } = require("tough-cookie");
const config = require("./config");
const state = require("./state");

const jar = new CookieJar();

const client = wrapper(
  axios.create({
    baseURL: config.baseUrl,
    timeout: config.requestTimeout,
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
  return req;
});

client.interceptors.response.use((res) => {
  console.log(`<-- ${res.status} ${res.config.url}`);
  return res;
});

module.exports = { client, jar };