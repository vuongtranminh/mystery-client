import { redirect } from "next/navigation";

import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";
import { fetchServerSide } from "@/app/api/fetch.server.api";
import serverApi from "@/app/api/server.api";

const SetupPage = async () => {
  // const profile = await initialProfile();

  // if (!profile) {
  //   redirect("/sign-in/deleteAllCookies");
  // }

  const getFirstServerJoin = async () => {
    const { response, error } = await fetchServerSide(serverApi.getFirstServerJoin);

    return response?.data;
  }

  const server = await getFirstServerJoin();

  if (server) {
    return redirect(`/servers/${server.serverId}`);
  }

  return <InitialModal />;
}
 
export default SetupPage;