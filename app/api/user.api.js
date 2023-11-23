import mystery from "./mystery";

export const userEndpoints = {
  me: "/user-service/users/me",
};

const userApi = {
  me: async (data, config) => {
    try {
      const response = await mystery.post(userEndpoints.me, data, config);

      return { response };
    } catch (error) { return { error }; }
  },
};

export default userApi;