import mystery from "./mystery";

const serverEndpoints = {
  getServerJoinByServerId: "/discord/server/getServerJoinByServerId",
  getFirstServerJoin: "/discord/server/getFirstServerJoin"
};

const serverApi = {
  getServerJoinByServerId: async (data = {}, config = {}) => {
    const { serverId } = data;
    try {
      const response = await mystery.post(serverEndpoints.getServerJoinByServerId,
        {
          serverId: serverId
        },
        config
      );

      return { response };
    } catch (err) { return { err }; }
  },
  getFirstServerJoin: async (data = {}, config = {}) => {
    try {
      const response = await mystery.post(serverEndpoints.getFirstServerJoin, data, config);

      return { response };
    } catch (err) { return { err }; }
  },
};

export default serverApi;