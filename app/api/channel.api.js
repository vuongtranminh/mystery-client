import mystery from "./mystery";

export const channelEndpoints = {
  getChannelsByServerId: "/discord/channel/getChannelsByServerId",
  getChannelByChannelId: "/discord/channel/getChannelByChannelId",
};

const channelApi = {
  getChannelsByServerId: async (data = {}, config = {}) => {
    const { serverId, pageNumber = 0, pageSize = 30 } = data;
    try {
      const response = await mystery.post(channelEndpoints.getChannelsByServerId,
        {
          serverId: serverId,
          pageNumber: pageNumber,
          pageSize: pageSize
        },
        config
      );

      return { response };
    } catch (err) { return { err }; }
  },
  getChannelByChannelId: async (data = {}, config = {}) => {
    const { channelId } = data;
    try {
      const response = await mystery.post(channelEndpoints.getChannelByChannelId,
        {
          channelId: channelId
        },
        config
      );

      return { response };
    } catch (err) { return { err }; }
  },
};

export default channelApi;