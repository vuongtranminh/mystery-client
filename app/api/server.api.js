import mystery from "./mystery";

export const serverEndpoints = {
  createServer: "createServer",
  getServerJoinByServerId: "/discord/server/getServerJoinByServerId",
  getFirstServerJoin: "/discord/server/getFirstServerJoin",
  getServersJoin: "/discord/server/getServersJoin",
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
    } catch (error) { return { error }; }
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
    } catch (error) { return { error }; }
  },
  getFirstServerJoin: async (data, config) => {
    try {
      const response = await mystery.post(serverEndpoints.getFirstServerJoin, data, config);

      return { response };
    } catch (error) { return { error }; }
  },
  getServersJoin: async (data, config) => {
    const { pageNumber = 0, pageSize = 30 } = data;
    try {
      const response = await mystery.post(serverEndpoints.getServersJoin,
        {
          pageNumber: pageNumber,
          pageSize: pageSize
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
};

export default serverApi;