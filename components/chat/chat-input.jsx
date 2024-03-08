"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useEffect } from "react";
import mystery from "@/app/api/mystery";
import { ClientMsg, ClientSendMessage, GrpcMessage } from "@/src/gen/message_pb";
import { useSocket } from "../providers/socket-provider";

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({
  apiUrl,
  params,
  name,
  type,
}) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    }
  });

  useEffect(() => {
    form.setFocus("content");
  }, [])

  const isLoading = form.formState.isSubmitting;

  // const onSubmit = async (values) => {
  //   try {
  //     await mystery.post(apiUrl, {
  //       content: values.content,
  //       fileUrl: values.fileUrl,
  //       channelId: params.channelId,
  //     });

  //     form.reset();
  //     router.refresh();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // change to ws
  const { socket } = useSocket();

  const onSubmit = (values) => {
    const textEncoder = new TextEncoder();

    const token = "token key";
    const tokenEncoder = textEncoder.encode(token);

    const contentEncoder = textEncoder.encode(values.content);

    const send = new ClientSendMessage({
      topicId: params.channelId,
      clientMessageId: uuidv4(),
      content: contentEncoder
    })

    const sendMessage = new ClientMsg({
      head: { token: tokenEncoder },
      Message: { case: "send", value: send }
    })
    // sendMessage.Message = { case: "send", value: send }
    socket.send(sendMessage.toBinary());
    
    form.reset();
    router.refresh();
  }

  useEffect(() => {
    if (!isLoading) {
      form.setFocus("content");
    }
  }, [isLoading])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen("messageFile", { apiUrl, params })}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    autoComplete="off"
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji) => field.onChange(`${field.value} ${emoji}`)}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}