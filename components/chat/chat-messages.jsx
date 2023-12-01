"use client";

import { Fragment, useRef, ElementRef } from "react";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";

import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

import { ChatWelcome } from "./chat-welcome";
import { ChatItem } from "./chat-item";
import messageApi from "@/app/api/message.api";

export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  apiUpdateUrl,
  apiDeleteUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  params,
  type,
}) => {

  const processUpdate = () => {
    switch (apiUpdateUrl) {
      case "updateMessage":
        return messageApi.updateMessage;
      default:
        return null;
    }
  }

  const processDelete = () => {
    switch (apiDeleteUrl) {
      case "deleteMessage":
        return messageApi.deleteMessage;
      default:
        return null;
    }
  }

  const apiUpdate = processUpdate();
  const apiDelete = processDelete();

  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update` 

  const chatRef = useRef(null);
  const bottomRef = useRef(null);

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
  } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
    params
  });
  useChatSocket({
    setInfo: setInfo, 
    chatId: chatId
  });

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: fetchNextPageStatus === "fetched" && !!hasNextPage,
    count: data?.content?.length,
  })

  if (status === "loading") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    )
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && (
        <ChatWelcome
          type={type}
          name={name}
        />
      )}
      {hasNextPage && (
        <div className="flex justify-center">
          {fetchNextPageStatus === "loading" ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.content?.map((message, index, messages) => (
          <ChatItem
            key={message.messageId}
            currentMember={member}
            message={message}
            socketUrl={socketUrl}
            socketQuery={socketQuery}
            apiUpdateUrl={apiUpdate}
            apiDeleteUrl={apiDelete}
            prevMessage={messages[index+1]}
          />
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  )
}