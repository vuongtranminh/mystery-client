import mystery from "./mystery";

export const memberEndpoints = {
  getMemberProfileByServerId: "/discord/member/getMemberProfileByServerId", 
  getMemberProfilesByServerId: "/discord/members/getMemberProfilesByServerId"
};

const memberApi = {
  getMemberProfileByServerId: async (data, config) => {
    const { serverId } = data;
    try {
      const response = await mystery.post(memberEndpoints.getMemberProfileByServerId,
        {
          serverId: serverId
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  getMemberProfilesByServerId: async (data, config) => {
    const { serverId, pageNumber = 0, pageSize = 30 } = data;
    try {
      const response = await mystery.post(memberEndpoints.getMemberProfilesByServerId,
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