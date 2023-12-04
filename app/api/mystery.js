import axios from "axios";
import queryString from "query-string";

const isServer = () => {
  return typeof window === "undefined";
}

// let isRefreshing = false;
// let failedQueue = []; 

// const processQueue = (originalRequest, response) => {
//   failedQueue.forEach(originalRequest => {
//     if (isServer()) {
//       originalRequest.headers["Cookie"] = convertSetCookieToCookie(response.headers['set-cookie'])
//     }
//     mystery(originalRequest);
//   });

//   failedQueue = [];
// };

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
  const originalRequest = error.config;

  // Kiểm tra xem lỗi có phải do token hết hạn không
  if (error.response?.status === 401 && !originalRequest?._retry) {

    // if (isRefreshing) {
    //   failedQueue.push(originalRequest)
    // }

    originalRequest._retry = true;

    console.log("CHECKKKKKKKKKKKKKK MYSTERY");
    // console.log(error)

    // console.log("HAS COOKIE: " + getCookie("refreshToken", originalRequest.headers["Cookie"]))

    // if (getCookie("refreshToken", originalRequest.headers["Cookie"])) {
      

    // } else {
    //   console.log("Not has refreshToken. Please login again.")
    // }
    try {
      // Gửi yêu cầu mới để lấy refresh token
      // const response = await mystery.post("/auth/refeshToken", null, {
      //   headers: {
      //     "Cookie": originalRequest.headers["Cookie"]
      //   }
      // });
      console.log("IS SERVER: " + isServer());

      if (isServer()) {
        console.log(originalRequest.headers["Cookie"])
      }
      const response = await axios.post(`${baseURL}/auth/refeshToken`, null, isServer() ? {
        headers: {
          "Cookie": originalRequest.headers["Cookie"]
        }
      } : null);
      console.info(`[response refreshToken]`)
      console.log(response)
      console.info(`[response refreshToken headers] [${JSON.stringify(response.headers)}]`)
      console.info(`[response refreshToken data] [${JSON.stringify(response.data)}]`)

      if (response?.data?.success) {
        // Thực hiện lại yêu cầu ban đầu với access token mới
        if (isServer()) {
          console.log("TRY REQUEST")
          console.log(originalRequest.headers["Cookie"])
          console.log("CONVERT")
          console.log(convertSetCookieToCookie(response.headers['set-cookie']))
          originalRequest.headers["Cookie"] = convertSetCookieToCookie(response.headers['set-cookie'])
        }
        return mystery(originalRequest);
      }

      // Lưu trữ access token mới vào local storage
      // localStorage.setItem(ACCESS_TOKEN, JSON.stringify(response.data.accessToken));
      // localStorage.setItem(REFRESH_TOKEN, JSON.stringify(response.data.refreshToken));

      // Cập nhật Authorization header với access token mới
      // privateClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;

    } catch (error) {
      // Lỗi khi lấy refresh token
      console.log("ERRORRRRRRRRRRRRRRR")
      console.error(error);
      console.log("Session time out. Please login again.")

      // show modal "Session time out. Please login again." to login
    }
  }

  // Trả về lỗi ban đầu nếu không phải do token hết hạn
  return Promise.reject(error);
};

mystery.interceptors.request.use(onRequest, onRequestError);
mystery.interceptors.response.use(onResponse, onResponseError);

export default mystery;