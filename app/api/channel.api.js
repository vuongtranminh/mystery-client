import mystery from "./mystery";

export const channelEndpoints = {
  createChannel: "/discord-service/channels/createChannel",
  updateChannel: "/discord-service/channels/updateChannel",
  deleteChannel: "/discord-service/channels/deleteChannel",
  getChannelsByServerId: "/discord-service/channels/getChannelsByServerId",
  getChannelByChannelId: "/discord-service/channels/getChannelByChannelId",
  getChannelGeneralByServerId: "/discord-service/channels/getChannelGeneralByServerId",
};

const channelApi = {
  createChannel: async (data, config) => {
    const { serverId, name, type } = data;
    try {
      const response = await mystery.post(channelEndpoints.createChannel,
        {
          serverId: serverId,
          name: name,
          type: type
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  updateChannel: async (data, config) => {
    const { channelId, name } = data;
    try {
      const response = await mystery.post(channelEndpoints.updateChannel,
        {
          channelId: channelId,
          name: name,
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  deleteChannel: async (data, config) => {
    const { channelId } = data;
    try {
      const response = await mystery.post(channelEndpoints.deleteChannel,
        {
          channelId: channelId
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
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
    const { serverId } = data;
    try {
      const response = await mystery.post(channelEndpoints.getChannelGeneralByServerId,
        {
          serverId: serverId
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
};

export default channelApi;