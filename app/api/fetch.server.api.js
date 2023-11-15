import { addCookie } from "@/lib/cookie.utils";
import { redirect } from "next/navigation";

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
    redirect("/sign-in/deleteAllCookies");
  }
  return { response, error };
}