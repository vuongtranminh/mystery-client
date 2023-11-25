// import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import client from "@/app/api/mystery";
import { fetchServerSide } from "@/app/api/fetch.server.api";
import channelApi from "@/app/api/channel.api";

const ServerIdPage = async ({ params }) => {

  console.log("SERVERID+++++++++++")
  console.log(params.serverId)
  // return;

  const getChannelGeneralByServerId = async () => {
    const { response, error } = await fetchServerSide(channelApi.getChannelGeneralByServerId, {
      serverId: params.serverId
    })

    return response?.data;
  }

  const initialChannel = await getChannelGeneralByServerId();

  if (!initialChannel) {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.channelId}`)
}
 
export default ServerIdPage;