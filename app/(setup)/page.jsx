import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";
import client from "@/app/api/mystery";
import { useSocket } from "@/components/providers/socket-provider";
import serverApi from "../api/server.api";
import { cookies } from "next/headers";

const SetupPage = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const refreshToken = cookieStore.get('refreshToken')
  const profile = await initialProfile();

  if (!profile) {
    return
  }

  const getFirstServerJoin = async () => {
    const { response, err } = await serverApi.getFirstServerJoin(null, {
      headers: {
        Cookie: `accessToken=${accessToken?.value}; refreshToken=${refreshToken?.value};`
      }
    });

    return response?.data
  }

  const server = await getFirstServerJoin();

  if (server) {
    return redirect(`/servers/${server.serverId}`);
  }

  return <InitialModal />;
}
 
export default SetupPage;