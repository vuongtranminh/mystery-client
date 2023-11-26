import mystery from "./mystery";

export const serverEndpoints = {
  createServer: "/discord-service/servers/createServer",
  getServerJoinByServerId: "/discord-service/servers/getServerJoinByServerId",
  getFirstServerJoin: "/discord-service/servers/getFirstServerJoin",
  getServersJoin: "/discord-service/servers/getServersJoin",
  joinServerByInviteCode: "/discord-service/servers/joinServerByInviteCode",
  leaveServer: "/discord-service/servers/leaveServer",
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
  joinServerByInviteCode: async (data, config) => {
    const { inviteCode } = data;
    try {
      const response = await mystery.post(serverEndpoints.joinServerByInviteCode,
        {
          inviteCode: inviteCode
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  leaveServer: async (data, config) => {
    const { serverId } = data;
    try {
      const response = await mystery.post(serverEndpoints.leaveServer,
        {
          serverId: serverId
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
};

export default serverApi;