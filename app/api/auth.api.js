import mystery from "./mystery";

export const authEndpoints = {
  signin: "/auth/signin",
  signup: "/auth/signup",
  logout: "/auth/logout",
};

const authApi = {
  signin: async (data, config) => {
    const { email, password } = data;
    try {
      const response = await mystery.post(authEndpoints.signin,
        {
          email: email,
          password: password
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  signup: async (data, config) => {
    const { name, email, password } = data;
    try {
      const response = await mystery.post(authEndpoints.signup,
        {
          name: name,
          email: email,
          password: password
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  logout: async (data, config) => {
    try {
      const response = await mystery.post(authEndpoints.logout, data, config);

      return { response };
    } catch (error) { return { error }; }
  },
};

export default authApi;