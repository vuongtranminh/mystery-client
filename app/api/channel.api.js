import mystery from "./mystery";

const channelEndpoints = {
  getChannelsByServerId: "/discord/channel/getChannelsByServerId",
  getChannelByChannelId: "/discord/channel/getChannelByChannelId",
};

const channelApi = {
  getChannelsByServerId: async (data = {}, config = {}) => {
    const { serverId, page = 0, size = 30 } = data;
    try {
      const response = await mystery.post(channelEndpoints.getChannelsByServerId,
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