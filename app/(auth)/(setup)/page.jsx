import { redirect } from "next/navigation";

import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";
import { fetchServerSide } from "@/app/api/fetch.server.api";
import serverApi from "@/app/api/server.api";

const SetupPage = async () => {
  const getFirstServerJoin = async () => {
    const [response, error] = await fetchServerSide(serverApi.getFirstServerJoin);

    return response?.data;
  }

  const server = await getFirstServerJoin();

  if (server) {
    redirect(`/servers/${server.serverId}`)
  }

  redirect('/me');
}
 
export default SetupPage;