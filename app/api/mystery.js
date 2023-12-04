import axios from "axios";
import queryString from "query-string";

const isServer = () => {
  return typeof window === "undefined";
}

let isRefreshing = false;
let refreshQueue = []; 
const RETRIES = 1;

const baseURL = "http://localhost:3000/app/api/v1";

// const getCookie = (cname, cookie) => {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(cookie);
//   let ca = decodedCookie.split(';');
//   for(let i = 0; i <ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

const convertSetCookieToCookie = (setCookie = []) => {
  return setCookie.map((cookie) => cookie.split("; ")[0]).join(";");
}

axios.defaults.withCredentials = true; // phải đặt giá trị này trên đầu config

const mystery = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  },
  headers: { 
    "Content-Type": "application/json" 
  },
  // withCredentials: true,
});

const onRequest = (config) => {
  // console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
};

const onRequestError = (error) => {
  // console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response) => {
  // console.info(`[response] [${JSON.stringify(response.headers)}]`)
  // console.info(`[response] [${JSON.stringify(response.data)}]`);
  // console.info(response)
  return response.data;
};

const onResponseError = async (error) => {
  // console.error(`[response error] [${JSON.stringify(error)}]`);

  const {
    config: originalRequest,
    response: { status },
  } = error

  if (status !== 401) {
    // Trả về lỗi ban đầu nếu không phải do token hết hạn
    return Promise.reject(error);
  }

  // console.log("RETRY")
  // console.log(originalRequest)
  // console.log(originalRequest._retry)
  // console.log(typeof originalRequest._retry)

  originalRequest._retry = typeof originalRequest._retry === 'undefined' ? 0 : ++originalRequest._retry;

  // console.log(originalRequest._retry)

  if (originalRequest._retry === RETRIES) {
    return Promise.reject(error);
  }

  if (!isRefreshing) {
    isRefreshing = true;

    // if (isServer()) {
    //   console.log(originalRequest.headers["Cookie"])
    // }

    try {
      const response = await axios.post(`${baseURL}/auth/refeshToken`, null, isServer() ? {
        headers: {
          "Cookie": originalRequest.headers["Cookie"]
        }
      } : null);
      // console.info(`[response refreshToken]`)
      // console.log(response)
      // console.info(`[response refreshToken headers] [${JSON.stringify(response.headers)}]`)
      // console.info(`[response refreshToken data] [${JSON.stringify(response.data)}]`)
  
      if (response?.data?.success) {
        refreshQueue.forEach((v) => v.resolve(response))
        refreshQueue = []

        // Thực hiện lại yêu cầu ban đầu với access token mới
        if (isServer()) {
          // console.log("TRY REQUEST")
          // console.log(originalRequest.headers["Cookie"])
          // console.log("CONVERT")
          // console.log(convertSetCookieToCookie(response.headers['set-cookie']))
          originalRequest.headers["Cookie"] = convertSetCookieToCookie(response.headers['set-cookie'])
        }
        // for api call refresh
        return mystery(originalRequest);
        // return mystery(originalRequest);
      }
    } catch (err) {
      refreshQueue.forEach((v) => v.reject(error))
      refreshQueue = []
    } finally {
      isRefreshing = false;
    }

    // for api call refresh
    return Promise.reject(error);
  }

  return new Promise((resolve, reject) => {
    refreshQueue.push({
      resolve: (res) => {
        // console.log("resolve PROMISE")
        // console.log(originalRequest)
        if (isServer()) {
          // console.log("TRY REQUEST")
          // console.log(originalRequest.headers["Cookie"])
          // console.log("CONVERT")
          // console.log(convertSetCookieToCookie(response.headers['set-cookie']))
          originalRequest.headers["Cookie"] = convertSetCookieToCookie(res.headers['set-cookie'])
        }
        resolve(mystery(originalRequest))
      },
      reject: (err) => {
        reject(err)
      },
    })
  })

  // // Trả về lỗi ban đầu nếu không phải do token hết hạn
  // return Promise.reject(error);
};

mystery.interceptors.request.use(onRequest, onRequestError);
mystery.interceptors.response.use(onResponse, onResponseError);

export default mystery;