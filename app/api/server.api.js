import mystery from "./mystery";

export const serverEndpoints = {
  createServer: "createServer",
  getServerJoinByServerId: "/discord/server/getServerJoinByServerId",
  getFirstServerJoin: "/discord/server/getFirstServerJoin"
};

const serverApi = {
  createServer: async (data, config) => {
    const { name, imgUrl } = data;
    try {
      const response = await mystery.post(serverEndpoints.createServer, {
        name: name, 
        imgUrl: imgUrl
      }, config);

      return { response };
    } catch (err) { return { err }; }
  },
  getServerJoinByServerId: async (data, config) => {
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
  getFirstServerJoin: async (data, config) => {
    try {
      const response = await mystery.post(serverEndpoints.getFirstServerJoin, data, config);

      return { response };
    } catch (err) { return { err }; }
  },
};

export default serverApi;