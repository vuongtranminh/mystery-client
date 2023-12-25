// import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChannelType } from "@/prisma/schema";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import channelApi from "@/app/api/channel.api";
import memberApi from "@/app/api/member.api";
import messageApi, { messageEndpoints } from "@/app/api/message.api";
import { fetchServerSide } from "@/app/api/fetch.server.api";
import CinemaRoom from "@/components/cinema-room";

const ChannelIdPage = async ({ params }) => {
  
  const getChannelByChannelId = async () => {
    const [response, error] = await fetchServerSide(channelApi.getChannelByChannelId, {
      channelId: params.channelId
    });

    return response?.data;
  }

  const getMemberByServerId = async () => {
    const [response, error] = await fetchServerSide(memberApi.getMemberByServerId, {
      serverId: params.serverId
    });

    return response?.data;
  }

  const channel = await getChannelByChannelId();
  const member = await getMemberByServerId();

  if (!channel || !member) {
    redirect("/");
  }

  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.channelId}
            type="channel"
            apiUrl={messageEndpoints.getMessagesByChannelId}
            apiUpdateUrl="updateMessage"
            apiDeleteUrl="deleteMessage"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.channelId,
              serverId: channel.serverId,
            }}
            params={{ channelId: channel.channelId, pageSize: 30 }}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl={messageEndpoints.createMessage}
            params={{ channelId: channel.channelId }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom
          chatId={channel.channelId}
          video={false}
          audio={true}
        />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom
          chatId={channel.channelId}
          video={true}
          audio={true}
        />
      )}
      {/* {channel.type === ChannelType.TEXT && (
        <CinemaRoom 
          chatId={channel.channelId}
        />
      )} */}
    </div>
   );
}
 
export default ChannelIdPage;