import { redirect } from "next/navigation";
// import { UserButton } from "@clerk/nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import client from "@/app/api/mystery";
import { fetchServerSide } from "@/app/api/fetch.api";
import serverApi from "@/app/api/server.api";

export const NavigationSidebar = async () => {
  // const profile = await currentProfile();

  // if (!profile) {
  //   return redirect("/");
  // }

  const getServersJoin = async () => {
    const { response, error } = await fetchServerSide(serverApi.getServersJoin, {
      pageNumber: 0,
      pageSize: 30
    })

    return response?.data?.content;
  }

  const servers = await getServersJoin();

  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3"
    >
      <NavigationAction />
      <Separator
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
      />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.serverId} className="mb-4">
            <NavigationItem
              id={server.serverId}
              name={server.name}
              imageUrl={server.imgUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        {/* <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]"
            }
          }}
        /> */}
      </div>
    </div>
  )
}