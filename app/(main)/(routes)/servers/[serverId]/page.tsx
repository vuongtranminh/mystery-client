// import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import client from "@/app/api/client";

interface ServerIdPageProps {
  params: {
    serverId: string;
  }
};

const ServerIdPage = async ({
  params
}: ServerIdPageProps) => {
  // const profile = await currentProfile();

  // if (!profile) {
  //   // return redirectToSignIn();
  // }

  // const server = await db.server.findUnique({
  //   where: {
  //     id: params.serverId,
  //     members: {
  //       some: {
  //         profileId: profile.id,
  //       }
  //     }
  //   },
  //   include: {
  //     channels: {
  //       where: {
  //         name: "general"
  //       },
  //       orderBy: {
  //         createdAt: "asc"
  //       }
  //     }
  //   }
  // })

  const getChannelGeneralByServerId = async () => {
    try {
      const data = await client.post("/servers/getChannelGeneralByServerId", {
        serverId: params.serverId
      });
      return data.data;
    } catch (error) {
      // console.log(error);
    }

    return null;
  }

  const initialChannel = await getChannelGeneralByServerId();

  if (!initialChannel) {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.channelId}`)
}
 
export default ServerIdPage;