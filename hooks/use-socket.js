export const useSocket = create((set) => ({
  data: {
    messageId: null, 
    content: null, 
    file_url: null, 
    channelId: null, 
    member: {
      memberId: null,
      role: null,
      serverId: null,
      joinAt: null,
      profileId: null,
      name: null,
      avtUrl: null,
    }

  },
  onMessage: (message) => set((state) => {
    const dataMessage = message.split("|")
    return {
      data: {
        messageId: dataMessage[0], 
        content: dataMessage[1], 
        file_url: dataMessage[2], 
        channelId: dataMessage[3], 
        member: {
          memberId: dataMessage[4],
          role: dataMessage[5],
          serverId: dataMessage[6],
          joinAt: dataMessage[7],
          profileId: dataMessage[8],
          name: dataMessage[9],
          avtUrl: dataMessage[10],
        }
    
      }
    }
  }),
}));