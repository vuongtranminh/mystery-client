import { redirect } from "next/navigation";
import mystery from "./mystery";

export const userEndpoints = {
  me: "/user/me",
};

const userApi = {
  me: async (data, config) => {
    // console.log("REDIRECT++++++")
    // redirect("/sign-in")
    try {
      const response = await mystery.post(userEndpoints.me, data, config);

      return { response };
    } catch (err) { return { err }; }
  },
};

export default userApi;