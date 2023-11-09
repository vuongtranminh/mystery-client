import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";
import client from "@/app/api/mystery";
import { useSocket } from "@/components/providers/socket-provider";
import serverApi from "../api/server.api";

const SetupPage = async () => {
  const profile = await initialProfile();

  const getFirstServerJoin = async () => {
    const { response, err } = await serverApi.getFirstServerJoin();

    return response?.data
  }

  const server = await getFirstServerJoin();

  if (server) {
    return redirect(`/servers/${server.serverId}`);
  }

  return <InitialModal />;
}
 
export default SetupPage;