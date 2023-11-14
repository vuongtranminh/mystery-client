import mystery from "./mystery";

export const messageEndpoints = {
  getMessagesByChannelId: "/discord/message/getMessagesByChannelId", 
  createMessage: "/discord/message/createMessage",
  updateMessage: "/discord/message/updateMessage",
  deleteMessage: "/discord/message/deleteMessage"
};

const messageApi = {
  getMessagesByChannelId: async (data, config) => {
    const { channelId, pageNumber = 0, pageSize = 30 } = data;
    try {
      const response = await mystery.post(messageEndpoints.getMessagesByChannelId,
        {
          channelId: channelId,
          pageNumber: pageNumber,
          pageSize: pageSize
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  createMessage: async (data, config) => {
    const { content, fileUrl, channelId } = data;
    try {
      const response = await mystery.post(messageEndpoints.createMessage,
        {
          content: content,
          fileUrl: fileUrl,
          channelId: channelId
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  updateMessage: async (data, config) => {
    const { messageId, content } = data;
    try {
      const response = await mystery.post(messageEndpoints.updateMessage,
        {
          messageId: messageId,
          content: content
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
  deleteMessage: async (data, config) => {
    const { messageId } = data;
    try {
      const response = await mystery.post(messageEndpoints.deleteMessage,
        {
          messageId: messageId
        },
        config
      );

      return { response };
    } catch (error) { return { error }; }
  },
};

export default messageApi;