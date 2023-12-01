import { ChannelType, MemberRole } from "@/prisma/schema";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { ServerHeader } from "./server-header";
import { ServerSearch } from "./server-search";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";
import channelApi from "@/app/api/channel.api";
import memberApi from "@/app/api/member.api";
import { fetchServerSide } from "@/app/api/fetch.server.api";
import serverApi from "@/app/api/server.api";

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
}

export const ServerSidebar = async ({ serverId }) => {

  const getServerJoinByServerId = async () => {
    const [response, error] = await fetchServerSide(serverApi.getServerJoinByServerId, {
      serverId: serverId
    });

    return response?.data
  }

  const server = await getServerJoinByServerId();

  const getChannelsByServerId = async () => {
    const [response, error] = await fetchServerSide(channelApi.getChannelsByServerId, {
      serverId: serverId,
      pageNumber: 0,
      pageSize: 30
    })
    return response?.data?.content;
  }

  const channels = await getChannelsByServerId();

  const getMembersByServerId = async () => {
    const [response, error] = await fetchServerSide(memberApi.getMembersByServerId, {
      serverId: serverId,
      pageNumber: 0,
      pageSize: 30
    })
    return response?.data?.content;
  }

  const getMemberByServerId = async () => {
    const [response, error] = await fetchServerSide(memberApi.getMemberByServerId, {
      serverId: serverId
    });

    return response?.data
  }

  const currentMember = await getMemberByServerId();

  const textChannels = channels.filter((channel) => channel.type === ChannelType.TEXT) 
  const audioChannels = channels.filter((channel) => channel.type === ChannelType.AUDIO) 
  const videoChannels = channels.filter((channel) => channel.type === ChannelType.VIDEO) 
  const members = await getMembersByServerId();

  if (!server) {
    return redirect("/");
  }

  const role = currentMember?.role;
  // console.log("CURRENT MEMBER")
  // // console.log(currentMember)
  // console.log(server)

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader
        server={server}
        role={role}
      />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.channelId,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.channelId,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.channelId,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.memberId,
                  name: member.name,
                  icon: roleIconMap[member.role],
                }))
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.channelId}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.channelId}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.channelId}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {/* {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember
                  key={member.memberId}
                  member={member}
                  server={server}
                />
              ))}
            </div>
          </div>
        )} */}
      </ScrollArea>
    </div>
  )
}