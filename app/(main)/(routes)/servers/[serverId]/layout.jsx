// import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ServerSidebar } from "@/components/server/server-sidebar";
import serverApi from "@/app/api/server.api";
import { fetchServerSide } from "@/app/api/fetch.server.api";

const ServerIdLayout = async ({ children, params, }) => {

  const getServerJoinByServerId = async () => {
    const { response, error } = await fetchServerSide(serverApi.getServerJoinByServerId, {
      serverId: params.serverId
    });

    return response?.data
  }

  const server = await getServerJoinByServerId();

  if (!server) {
    return redirect("/");
  }

  return ( 
    <div className="h-full">
      <div 
      className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
   );
}
 
export default ServerIdLayout;