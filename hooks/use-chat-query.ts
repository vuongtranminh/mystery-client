import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import client from "@/app/api/client";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
};

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue
}: ChatQueryProps) => {
  // const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = 0 }) => {
    // const url = qs.stringifyUrl({
    //   url: apiUrl,
    //   query: {
    //     cursor: pageParam,
    //     [paramKey]: paramValue,
    //   }
    // }, { skipNull: true });

    const url = apiUrl;
    try {
      const data = await client.post(url, {
        [paramKey]: paramValue,
        page: pageParam,
        size: 30,
        serverId: "b8ae3f8e-3931-49f8-8982-df057c68eeab"
      });
      return {
        items: data.data?.content,
        nextCursor: pageParam + 1
      };
    } catch (error) {
      // console.log(error);
    }

    return {
      items: [],
      nextCursor: null
    };

    // const res = await fetch(url);
    // return res.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    // refetchInterval: isConnected ? false : 1000,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}