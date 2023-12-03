import { useEffect, useState } from "react";

export const useInfiniteQuery = ({ queryFn = undefined, getNextPageParam = undefined, condition = true }) => {
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
    const pageParam = getNextPageParam(info.isLast ? null : info.data.meta.pageNumber);

    setFetchNextPageStatus("loading");
    let data = {
      ...info.data,
    };

    const [res, err] = await queryFn({ pageParam: pageParam });

    if (res?.success) {
      data = res.data;
    } else {
      setFetchNextPageStatus("error");
    }

    const { content, meta } = data;

    const hasNextPage = meta.pageNumber + 1 < meta.totalPages;
    
    const hasPreviousPage = meta.pageNumber > 0;

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

    const [res, err] = await queryFn({});

    if (res?.success) {
      data = res.data
    } else {
      setStatus("error");
    }

    const { content = [], meta = {
      page: 0
    } } = data;

    const hasNextPage = meta.pageNumber + 1 < meta.totalPages;
    
    const hasPreviousPage = meta.pageNumber > 0;

    const isFirst = !hasPreviousPage;

    const isLast = !hasNextPage;

    setInfo({
      data: {
        content: content,
        meta: meta,
      },
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
      isFirst: isFirst,
      isLast: isLast
    });
    setStatus("fetched");
  }

  useEffect(() => {
    if (condition) {
      fetchData();
    }
  }, [condition])

  return {
    ...info,
    status: status,
    fetchNextPage,
    getNextPageParam,
    setInfo,
    fetchNextPageStatus: fetchNextPageStatus,
  };
}