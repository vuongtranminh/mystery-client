import qs from "query-string";
// import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import client from "@/app/api/mystery";
import { useEffect, useReducer, useRef, useState } from "react";

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue
}) => {
  // const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = 0 }) => {

    const url = apiUrl;

    const data = await client.post(url, {
      [paramKey]: paramValue,
      page: pageParam,
      size: 10,
      serverId: "b8ae3f8e-3931-49f8-8982-df057c68eeab"
    });

    return {
      content: data.data?.content,
      meta: data.data?.meta
    };

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

export const useInfiniteQuery = ({ queryFn = undefined, getNextPageParam = undefined }) => {
  const [status, setStatus] = useState("fetched");
  const [fetchNextPageStatus, setFetchNextPageStatus] = useState("fetched");
  const [info, setInfo] = useState({
    data: {
      content: [],
      meta: {}
    },
    hasNextPage: false,
    hasPreviousPage: false,
    isFirst: true,
    isLast: false
  });
  const fetchNextPage = async () => {
    if (info.isLast) return;
    const pageParam = getNextPageParam(info.isLast ? null : info.data.meta.page);

    setFetchNextPageStatus("loading");
    let data = {
      ...info.data,
    };
    try {
      data = await queryFn({ pageParam: pageParam });
    } catch (error) {
      setFetchNextPageStatus("error");
    }

    const { content, meta } = data;

    const hasNextPage = meta.page + 1 < meta.totalPages;
    
    const hasPreviousPage = meta.page > 0;

    const isFirst = !hasPreviousPage;

    const isLast = !hasNextPage;

    setInfo(prev => {
      return {
        data: {
          content: [...prev.data.content, ...content],
          meta: meta
        },
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage,
        isFirst: isFirst,
        isLast: isLast
      }
    });
    setFetchNextPageStatus("fetched");
  }

  const fetchData = async () => {
    setStatus("loading");
    let data = {
      ...info.data
    };
    try {
      data = await queryFn({});
    } catch (error) {
      setStatus("error");
    }

    const { content, meta } = data;

    const hasNextPage = meta.page + 1 < meta.totalPages;
    
    const hasPreviousPage = meta.page > 0;

    const isFirst = !hasPreviousPage;

    const isLast = !hasNextPage;

    setInfo({
      data: data,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
      isFirst: isFirst,
      isLast: isLast
    });
    setStatus("fetched");
  }

  useEffect(() => {
    fetchData();
  }, [])

  return {
    ...info,
    status: status,
    fetchNextPage,
    getNextPageParam,
    setInfo,
    fetchNextPageStatus: fetchNextPageStatus,
  };
}