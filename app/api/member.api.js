import mystery from "./mystery";

export const memberEndpoints = {
  getMemberByServerId: "/discord-service/members/getMemberByServerId", 
  getMembersByServerId: "/discord-service/members/getMembersByServerId"
};

const memberApi = {
  getMemberByServerId: async (data, config) => {
    const { serverId } = data;
    try {
      const response = await mystery.post(memberEndpoints.getMemberByServerId,
        {
          serverId: serverId
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  getMembersByServerId: async (data, config) => {
    const { serverId, pageNumber = 0, pageSize = 30 } = data;
    try {
      const response = await mystery.post(memberEndpoints.getMembersByServerId,
        {
          serverId: serverId,
          pageNumber: pageNumber,
          pageSize: pageSize
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
};

export default memberApi;