// import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChannelType } from "@/prisma/schema";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import channelApi from "@/app/api/channel.api";
import memberApi from "@/app/api/member.api";

const ChannelIdPage = async ({ params }) => {
  
  const getChannelByChannelId = async () => {
    const { response, err } = await channelApi.getChannelByChannelId({
      channelId: params.channelId
    });

    return response.data
  }

  const getMemberProfileByServerId = async () => {
    const { response, err } = await memberApi.getMemberProfileByServerId({
      serverId: params.serverId
    });

    return response.data
  }

  const channel = await getChannelByChannelId();
  const member = await getMemberProfileByServerId();

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
            apiUrl="/messages/getMessagesByChannelId"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.channelId,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.channelId}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/messages/createMessage"
            query={{
              channelId: channel.channelId,
              serverId: channel.serverId
            }}
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
    </div>
   );
}
 
export default ChannelIdPage;