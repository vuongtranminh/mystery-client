import { redirect } from "next/navigation";
import mystery from "./mystery";
import { cookies } from "next/headers";

export const fetchServerSide = async (callback, data, config) => {
  const { response, err } = await callback(data, config);
  console.log("RESPONSE")
  console.log(response)
  console.log("ERROR")
  // console.log(err)
  console.log("END ERROR")
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const refreshToken = cookieStore.get('refreshToken')

  let cookie;
  if (accessToken?.value) {
    cookie = `accessToken=${accessToken?.value}`
  }
  if (refreshToken?.value) {
    cookie = cookie + `; refreshToken=${refreshToken?.value};`
  }

  if (err?.response?.status === 401) {
    const response = await mystery.post("/auth/logout", null, {
      headers: {
        "Cookie": cookie
      }
    });
    redirect("/sign-in")
  }
  return { response, err };
}