import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";
import client from "@/app/api/client";
import { useSocket } from "@/components/providers/socket-provider";

const SetupPage = async () => {
  const profile = await initialProfile();

  const getFirstServerJoin = async () => {
    try {
      const data = await client.post("/discord/servers/getFirstServerJoin");
      return data.data;
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  const server = await getFirstServerJoin();

  if (server) {
    return redirect(`/servers/${server.serverId}`);
  }

  return <InitialModal />;
}
 
export default SetupPage;