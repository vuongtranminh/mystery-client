"use client"

import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import EnqueueInput from './enqueue-input'
import { useCinema } from '../cinema-room'
import PeerService from '@/app/api/peer.api';
import { PlayCircle, Trash } from 'lucide-react'
import { ActionTooltip } from '../action-tooltip'
import moment from 'moment';

const QueueCard = () => {
  const cinema = useCinema()
  const {queue, currentTrack} = cinema.player;

  const handleDelete = (track) => {
    cinema.player.removeTrack(track.id);
    PeerService.sendAll(encodeURIComponent(JSON.stringify({
      action: 'remove-track',
      data: track.id,
    })));
  }

  const handlePlay = (track) => {
    const newState = {
      currentTrack: track.id,
      currentTrackTime: 0
    };
    cinema.player.syncPlayer(newState);
    PeerService.sendAll(encodeURIComponent(JSON.stringify({
      action: 'sync-player',
      data: newState
    })));
  }

  return (
    <Card className='h-full'>
      <CardHeader className='p-2'>
        <EnqueueInput />
        <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Playlist
          </span>
        </div>
      </div>
      </CardHeader>
      <CardContent className='p-2'>
        <ScrollArea className="">
          {queue.map(track => (
            <div 
              key={track.id}
              className='flex justify-between space-x-4 rounded-md py-2 transition-all hover:bg-accent hover:text-accent-foreground'
            >
              <div className='flex'>
                <img
                  src={track.picture}
                  alt="Music"
                  className="h-[30px] w-[30px]"
                />
                <div>
                  <div className='text-sm'>{track.title}</div>
                  <div className='text-xs'>{moment.utc(track.duration * 1000).format(
                    track.duration > 3600 ? 'HH:mm:ss' : 'mm:ss'
                  )}</div>
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <ActionTooltip label="Delete">
                  <Trash className='cursor-pointer' onClick={() => handleDelete(track)} />
                </ActionTooltip>
                {currentTrack === track.id ? (
                  <ActionTooltip label="Play">
                    <PlayCircle className='cursor-pointer' onClick={() => handlePlay(track)} />
                  </ActionTooltip>
                ) : (
                  <AudioLines />
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default QueueCard