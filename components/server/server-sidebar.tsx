import { ChannelType, MemberRole } from "@/prisma/schema";
import { redirect } from "next/navigation";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ServerHeader } from "./server-header";
import { ServerSearch } from "./server-search";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";
import client from "@/app/api/client";

interface ServerSidebarProps {
  serverId: string;
}

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

export const ServerSidebar = async ({
  serverId
}: ServerSidebarProps) => {
  // const profile = await currentProfile();

  // if (!profile) {
  //   return redirect("/");
  // }

  // const server = await db.server.findUnique({
  //   where: {
  //     id: serverId,
  //   },
  //   include: {
  //     channels: {
  //       orderBy: {
  //         createdAt: "asc",
  //       },
  //     },
  //     members: {
  //       include: {
  //         profile: true,
  //       },
  //       orderBy: {
  //         role: "asc",
  //       }
  //     }
  //   }
  // });

  const getServerJoinByServerId = async () => {
    try {
      const data = await client.post("/servers/getServerJoinByServerId", {
        serverId: serverId
      });
      
      return data.data;
    } catch (error) {
      // console.log(error);
    }

    return null;
  }

  const server = await getServerJoinByServerId();

  const getChannelsByServerId = async () => {
    try {
      const data = await client.post("/servers/getChannelsByServerId", {
        serverId: serverId,
        page: 0,
        size: 30
      });

      return data.data?.content;
    } catch (error) {
      console.log(error);
    }

    return [];
  }

  const channels = await getChannelsByServerId();

  const getMemberProfilesByServerId = async () => {
    try {
      const data = await client.post("/servers/getMemberProfilesByServerId", {
        serverId: serverId,
        page: 0,
        size: 30
      });

      return data.data?.content;
    } catch (error) {
      console.log(error);
    }

    return [];
  }

  const membersServer = await getMemberProfilesByServerId();

  const textChannels = channels.filter((channel) => channel.type === 1) // ChannelType.TEXT
  const audioChannels = channels.filter((channel) => channel.type === 2) // ChannelType.AUDIO
  const videoChannels = channels.filter((channel) => channel.type === 3) // ChannelType.VIDEO
  const members = membersServer.filter((member) => member.profileId !== "60bb8f79-8331-48d6-84b0-c22bc7def056")

  // if (!server) {
  //   return redirect("/");
  // }

  const role = membersServer.find((member) => member.profileId === "60bb8f79-8331-48d6-84b0-c22bc7def056")?.role; // get api /aaaa

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
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
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
                  key={channel.id}
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
                  key={channel.id}
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
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
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
                  key={member.id}
                  member={member}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}