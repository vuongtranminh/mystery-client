import axios from "axios";

const baseURL = "http://localhost:3000/app";

const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  },
});

// Add a request interceptor
client.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log("--------")
  console.log(config)
  console.log("--------")
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
client.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response && response.data) return response.data;
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default client;