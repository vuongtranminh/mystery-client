import qs from "query-string";
// import { useInfiniteQuery } from "@tanstack/react-query";

import { useInfiniteQuery } from "./use-infinite-query";
import memberApi from "@/app/api/member.api";
import { fetchClientSide } from "@/app/api/fetch.client.api";

export const useMemberQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
  params, 
  condition
}) => {

  const fetchMembers = async ({ pageParam = 0 }) => { 
    const [res, err] = await fetchClientSide(memberApi.getMembersByServerId, {
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
    queryFn: fetchMembers,
    getNextPageParam: (pageParam) => {
      return pageParam !== null ? pageParam + 1 : null
    },
    condition
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