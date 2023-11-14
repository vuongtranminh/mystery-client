import { redirect } from "next/dist/server/api-utils";

const isServer = () => {
  return typeof window === "undefined";
}

export const redirectToSignIn = () => {
  if (isServer) {
    redirect("/sign-in/deleteAllCookies");
  } else {
    const router = useRouter();
    router.push("/sign-in/deleteAllCookies");
  }
}