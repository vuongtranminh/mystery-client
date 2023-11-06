// import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChannelType } from "@/prisma/schema";

import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { db } from "@/lib/db";
import client from "@/app/api/mystery";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}

const ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {
  // const profile = await currentProfile();

  // if (!profile) {
  //   // return redirectToSignIn();
  // }

  // const channel = await db.channel.findUnique({
  //   where: {
  //     id: params.channelId,
  //   },
  // });

  // const member = await db.member.findFirst({
  //   where: {
  //     serverId: params.serverId,
  //     profileId: profile.id,
  //   }
  // });
  const getChannelByChannelId = async () => {
    try {
      const data = await client.post("/discord/channels/getChannelByChannelId", {
        channelId: params.channelId,
        serverId: params.serverId
      });
      return data.data;
    } catch (error) {
      // console.log(error);
    }

    return null;
  }

  const getMemberProfileByServerId = async () => {
    try {
      const data = await client.post("/discord/members/getMemberProfileByServerId", {
        serverId: params.serverId
      });
      return data.data;
    } catch (error) {
      // console.log(error);
    }

    return null;
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