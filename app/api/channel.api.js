import mystery from "./mystery";

export const channelEndpoints = {
  getChannelsByServerId: "/discord-service/channels/getChannelsByServerId",
  getChannelByChannelId: "/discord-service/channels/getChannelByChannelId",
  getChannelGeneralByServerId: "/discord-service/channels/getChannelGeneralByServerId",
};

const channelApi = {
  getChannelsByServerId: async (data, config) => {
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
    } catch (error) { return { error }; }
  },
  getChannelByChannelId: async (data, config) => {
    const { channelId } = data;
    try {
      const response = await mystery.post(channelEndpoints.getChannelByChannelId,
        {
          channelId: channelId
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  getChannelGeneralByServerId: async (data, config) => {
    const { channelId } = data;
    try {
      const response = await mystery.post(channelEndpoints.getChannelGeneralByServerId,
        {
          channelId: channelId
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
};

export default channelApi;