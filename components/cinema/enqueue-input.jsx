"use client"

import { prepareTrack } from '@/app/api/youtube.api';
import React, { useState } from 'react'
import { useCinema } from '../cinema-room';
import PeerService from '@/app/api/peer.api';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';

const formSchema = z.object({
  url: z.string().min(1),
});

const EnqueueInput = () => {

  const cinema = useCinema();
  // const [url, setUrl] = useState('');
  // const [loading, setLoading] = useState(false);
  const {profile} = cinema.app;
  const {queue} = cinema.player;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      const track = await prepareTrack(values.url);
      if (queue.find(t => t.id === track.id)) {
        throw new Error("Track already in queue");
      }
      console.log(track)
      PeerService.sendAll(encodeURIComponent(JSON.stringify({
        action: 'enqueue',
        data: {
          ...track,
          source: profile?.userId
        },
      })));
      cinema.player.enqueueTrack(track);

      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
      console.log('Failed to enqueue video')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-4 gap-1'>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className='col-span-3'>
              <FormControl>
                <Input
                  disabled={isLoading}
                  autoComplete="off"
                  className="px-4 py-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                  placeholder="YouTube URL..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          variant="ghost"
        >
          Add
        </Button>
      </form>
    </Form>
  )
}

export default EnqueueInput