import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Member, Message, Profile } from "@/prisma/schema";

import { useSocket } from "@/components/providers/socket-provider";

export const useChatSocket = ({
  setInfo, 
  chatId,
}) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("messageEvent:1", (message) => {
      if (chatId !== message.channelId) {
        return;
      }

      setInfo((oldData) => ({
        ...oldData,
        data: {
          content: [message, ...oldData.data.content],
          meta: oldData.data.meta
        }
      }));
    })

    socket.on("messageEvent:2", (message) => {
      if (chatId !== message.channelId) {
        return;
      }

      setInfo((oldData) => {
        const messageUpdateIndex = oldData.data.content.findIndex(item => item.messageId === message.messageId);
        if (messageUpdateIndex === -1) {
          return oldData;
        }

        const newContent = [...oldData.data.content];
        newContent.splice(messageUpdateIndex, 1, message);
        return {
          ...oldData,
          data: {
            content: newContent,
            meta: oldData.data.meta
          }
        };
      });
    })

    // socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
    //   queryClient.setQueryData([queryKey], (oldData: any) => {
    //     if (!oldData || !oldData.pages || oldData.pages.length === 0) {
    //       return oldData;
    //     }

    //     const newData = oldData.pages.map((page: any) => {
    //       return {
    //         ...page,
    //         items: page.items.map((item: MessageWithMemberWithProfile) => {
    //           if (item.id === message.id) {
    //             return message;
    //           }
    //           return item;
    //         })
    //       }
    //     });

    //     return {
    //       ...oldData,
    //       pages: newData,
    //     }
    //   })
    // });

    // socket.on(addKey, (message: MessageWithMemberWithProfile) => {
    //   queryClient.setQueryData([queryKey], (oldData: any) => {
    //     if (!oldData || !oldData.pages || oldData.pages.length === 0) {
    //       return {
    //         pages: [{
    //           items: [message],
    //         }]
    //       }
    //     }

    //     const newData = [...oldData.pages];

    //     newData[0] = {
    //       ...newData[0],
    //       items: [
    //         message,
    //         ...newData[0].items,
    //       ]
    //     };

    //     return {
    //       ...oldData,
    //       pages: newData,
    //     };
    //   });
    // });

    return () => {
      socket.off("messageEvent:1");
      socket.off("messageEvent:2");
      // socket.off(addKey);
      // socket.off(updateKey);
    }
  }, [socket]);
}