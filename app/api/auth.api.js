import mystery from "./mystery";

export const authEndpoints = {
  logout: "/user-service/auth/logout",
};

const authApi = {
  logout: async (data, config) => {
    try {
      const response = await mystery.post(authEndpoints.logout, data, config);

      return { response };
    } catch (error) { return { error }; }
  },
};

export default authApi;