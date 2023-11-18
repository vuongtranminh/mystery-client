import { globalRouter } from "@/lib/globalRouter";

export const fetchClientSide = async (callback, data, config) => {
  const { response, error } = await callback(data, config);
  if (error?.response?.status === 401) {
    const router = globalRouter.router;
    router.push("/sign-in/deleteAllCookies");
  }
  return { response, error };
}