import { cookies } from "next/headers";

export const addCookie = (...args) => {
  const cookieStore = cookies();
  let cookiesArr = [];

  for (const name of args) {
    const cookie = cookieStore.get(name);
    if (cookie?.value) {
      cookiesArr.push(`${name}=${cookie.value}`);
    }
  }

  return {
    "Cookie": cookiesArr.join(";")
  };
}