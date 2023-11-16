import axios from "axios";
import queryString from "query-string";

const isServer = () => {
  return typeof window === "undefined";
}

const baseURL = "http://localhost:3000/app/api/v1";

const getCookie = (cname, cookie) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

axios.defaults.withCredentials = true; // phải đặt giá trị này trên đầu config

const mystery = axios.create({
  // withCredentials: true,
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
    originalRequest._retry = true;

    if (getCookie("refreshToken", originalRequest.headers["Cookie"])) {
      try {
        // Gửi yêu cầu mới để lấy refresh token
        const response = await mystery.post("/auth/refeshToken", null, {
          headers: {
            "Cookie": originalRequest.headers["Cookie"]
          }
        });
        console.info(`[response refreshToken] [${JSON.stringify(response.headers)}]`)

        if (response?.success) {
          // Thực hiện lại yêu cầu ban đầu với access token mới
          return mystery(originalRequest);
        }
  
        // Lưu trữ access token mới vào local storage
        // localStorage.setItem(ACCESS_TOKEN, JSON.stringify(response.data.accessToken));
        // localStorage.setItem(REFRESH_TOKEN, JSON.stringify(response.data.refreshToken));
  
        // Cập nhật Authorization header với access token mới
        // privateClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
  
      } catch (error) {
        // Lỗi khi lấy refresh token
        console.error(error);
        console.log("Session time out. Please login again.")

        // show modal "Session time out. Please login again." to login
      }

    } else {
      console.log("Not has refreshToken. Please login again.")
    }
  }

  // Trả về lỗi ban đầu nếu không phải do token hết hạn
  return Promise.reject(error);
};

mystery.interceptors.request.use(onRequest, onRequestError);
mystery.interceptors.response.use(onResponse, onResponseError);

export default mystery;