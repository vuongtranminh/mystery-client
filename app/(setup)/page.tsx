import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";
import client from "@/app/api/client";
import { useSocket } from "@/components/providers/socket-provider";

const SetupPage = async () => {
  // const profile = await initialProfile();

  // const { onMessage } = useSocket();

  // const connectWebsocket = () => {
  //   console.log("++++++connect")
  //   const socket = new WebSocket("ws://localhost:8080/handle/9fad9a7d-1a1b-47f2-9cea-66abb7719968");

  //   // Listen for messages
  //   socket.addEventListener("message", (event) => {
  //     console.log("Message from server ", event.data);
  //     onMessage(event.data);
  //   });
  // }

  const getFirstServerJoin = async () => {
    try {
      const data = await client.post("/servers/getFirstServerJoin");
      return data.data;
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  const server = await getFirstServerJoin();

  if (server) {
    // connectWebsocket();
    return redirect(`/servers/${server.serverId}`);
  }

  return <InitialModal />;
}
 
export default SetupPage;