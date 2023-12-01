// import { redirectToSignIn } from "@clerk/nextjs";
import { fetchServerSide } from "@/app/api/fetch.server.api";
import serverApi from "@/app/api/server.api";
import { redirect } from "next/navigation";

const InviteCodePage = async ({
  params
}) => {
  const joinServerByInviteCode = async () => {
    const [response, error] = await fetchServerSide(serverApi.joinServerByInviteCode, {
      inviteCode: params.inviteCode
    })

    return response?.data
  }


  const server = await joinServerByInviteCode();

  console.log("+++++")
  console.log(server)

  if (server?.serverId) {
    redirect(`/servers/${server?.serverId}`);
  }
  
  redirect("/");
}
 
export default InviteCodePage;