"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "@livekit/components-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  message: z.string().min(1),
});

export const ChatForm = () => {

  const { send, isSending } = useChat();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    }
  });

  const isLoading = form.formState.isSubmitting || isSending;

  const onSubmit = async (values) => {
    if (!send) return;
    send(values.message)
    form.reset();
    form.setFocus("message");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-4 gap-1'>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className='col-span-3'>
              <FormControl>
                <Input
                  disabled={isLoading}
                  autoComplete="off"
                  className="px-4 py-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                  placeholder="Send a message"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          variant="ghost"
        >
          Chat
        </Button>
      </form>
    </Form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
