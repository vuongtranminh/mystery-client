"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import serverApi from "@/app/api/server.api";
import UserButton from "../auth/user-button";
import { fetchClientSide } from "@/app/api/fetch.client.api";
import { useInfiniteQuery } from "@/hooks/use-infinite-query";

export const NavigationSidebar = () => {

  const getServersJoin = async ({ pageParam = 0 }) => { 
    const [res, err] = await fetchClientSide(serverApi.getServersJoin, {
      pageNumber: pageParam,
      pageSize: 10
    })

    return [res, err];

  };

  const {
    data,
    hasNextPage,
    hasPreviousPage,
    isFirst,
    isLast,
    status,
    fetchNextPageStatus,
    setInfo,
    fetchNextPage
  } = useInfiniteQuery({
    queryFn: getServersJoin,
    getNextPageParam: (pageParam) => {
      return pageParam !== null ? pageParam + 1 : null
    },
  })

  const { content: servers, meta } = data;

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
        <UserButton />
      </div>
    </div>
  )
}