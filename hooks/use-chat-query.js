import qs from "query-string";
// import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import { useEffect, useReducer, useRef, useState } from "react";
import mystery from "@/app/api/mystery";
import { useInfiniteQuery } from "./use-infinite-query";
import { fetchClientSide } from "@/app/api/fetch.client.api";
import messageApi from "@/app/api/message.api";

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
  params
}) => {
  // const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = 0 }) => { 

    // const data = await mystery.post(apiUrl, {
    //   ...params,
    //   pageNumber: pageParam,
    // });

    // return {
    //   content: data.data?.content,
    //   meta: data.data?.meta
    // };

    const [res, err] = await fetchClientSide(messageApi.getMessagesByChannelId, {
      ...params,
      pageNumber: pageParam,
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
    queryFn: fetchMessages,
    getNextPageParam: (pageParam) => {
      return pageParam !== null ? pageParam + 1 : null
    },
  })

  return {
    data,
    hasNextPage,
    hasPreviousPage,
    isFirst,
    isLast,
    status,
    fetchNextPageStatus,
    setInfo,
    fetchNextPage
  };
}