import { redirectToSignIn } from "../../lib/auth.utils";
import { addCookie } from "@/lib/cookie.utils";

export const fetchServerSide = async (callback, data, config = {}) => {
  config = {
    ...config, 
    headers: {
      ...addCookie('accessToken', 'refreshToken'),
      ...config?.headers
    }
  }
  const { response, error } = await callback(data, config);
  if (error?.response?.status === 401) {
    redirectToSignIn();
  }
  return { response, error };
}

export const fetchClientSide = async (callback, data, config) => {
  const { response, error } = await callback(data, config);
  if (error?.response?.status === 401) {
    redirectToSignIn()
  }
  return { response, error };
}