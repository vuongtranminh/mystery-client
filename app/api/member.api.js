import mystery from "./mystery";

const memberEndpoints = {
  getMemberProfileByServerId: "/discord/member/getMemberProfileByServerId", 
  getMemberProfilesByServerId: "/discord/members/getMemberProfilesByServerId"
};

const memberApi = {
  getMemberProfileByServerId: async (data = {}, config = {}) => {
    const { serverId } = data;
    try {
      const response = await mystery.post(memberEndpoints.getMemberProfileByServerId,
        {
          serverId: serverId
        },
        config
      );

      return { response };
    } catch (err) { return { err }; }
  },
  getMemberProfilesByServerId: async (data = {}, config = {}) => {
    const { serverId, page = 0, size = 30 } = data;
    try {
      const response = await mystery.post(memberEndpoints.getMemberProfilesByServerId,
        {
          serverId: serverId,
          page: page,
          size: size
        },
        config
      );

      return { response };
    } catch (err) { return { err }; }
  },
};

export default memberApi;