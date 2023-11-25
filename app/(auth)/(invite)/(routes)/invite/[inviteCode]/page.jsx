// import { redirectToSignIn } from "@clerk/nextjs";
import { fetchServerSide } from "@/app/api/fetch.server.api";
import serverApi from "@/app/api/server.api";
import { redirect } from "next/navigation";

// import { db } from "@/lib/db";
// import { currentProfile } from "@/lib/current-profile";

const InviteCodePage = async ({
  params
}) => {
  // const profile = await currentProfile();

  // if (!profile) {
  //   // return redirectToSignIn();
  // }

  if (!params.inviteCode) {
    return redirect("/");
  }

  // const existingServer = await db.server.findFirst({
  //   where: {
  //     inviteCode: params.inviteCode,
  //     members: {
  //       some: {
  //         profileId: profile.id
  //       }
  //     }
  //   }
  // });

  // if (existingServer) {
  //   return redirect(`/servers/${existingServer.id}`);
  // }

  // const server = await db.server.update({
  //   where: {
  //     inviteCode: params.inviteCode,
  //   },
  //   data: {
  //     members: {
  //       create: [
  //         {
  //           profileId: profile.id,
  //         }
  //       ]
  //     }
  //   }
  // });

  const joinServerByInviteCode = async () => {
    const { response, error } = await fetchServerSide(serverApi.joinServerByInviteCode, {
      inviteCode: params.inviteCode
    })

    return response?.data
  }

  const { serverId } = await joinServerByInviteCode();

  if (serverId) {
    return redirect(`/servers/${serverId}`);
  }
  
  return null;
}
 
export default InviteCodePage;