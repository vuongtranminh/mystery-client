import mystery from "./mystery";

export const userEndpoints = {
  me: "/user/me",
};

const userApi = {
  me: async (data = {}, config = {}) => {
    try {
      const response = await mystery.post(userEndpoints.me, data, config);

      return { response };
    } catch (err) { return { err }; }
  },
};

export default userApi;