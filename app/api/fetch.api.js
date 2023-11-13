import { redirect, useRouter } from "next/navigation";
import mystery from "./mystery";

export const fetchServerSide = async (callback, data, config) => {
  const { response, err } = await callback(data, config);
  if (err?.response?.status === 401) {
    redirect("/sign-in/deleteAllCookies");
  }
  return { response, err };
}

export const fetchClientSide = async (callback, data, config) => {
  const { response, err } = await callback(data, config);
  if (err?.response?.status === 401) {
    await mystery.post("/auth/login");
    const router = useRouter();
    router.push("/sign-in");
  }
  return { response, err };
}