"use client"

import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import EnqueueInput from './enqueue-input'
import { useCinema } from '../cinema-room'
import { AudioLines, PlayCircle, Trash } from 'lucide-react'
import { ActionTooltip } from '../action-tooltip'
import moment from 'moment';
import clsx from 'clsx'

const QueueCard = () => {
  const queue = [{}]
  const currentTrack = null

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
              className={clsx('flex justify-between space-x-4 rounded-md p-1 transition-all hover:bg-accent hover:text-accent-foreground', currentTrack === track.id && 'bg-accent')}
            >
              <div className='flex gap-1'>
                <img
                  src={track.picture}
                  alt="Music"
                  className="h-13 w-20"
                />
                <div className='flex flex-col justify-between'>
                  <div className='text-sm line-clamp-2'>{track.title}</div>
                  <div className='text-xs'>{moment.utc(track.duration * 1000).format(
                    track.duration > 3600 ? 'HH:mm:ss' : 'mm:ss'
                  )}</div>
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <ActionTooltip label="Delete">
                  <Trash className='cursor-pointer w-4 h-4' onClick={() => handleDelete(track)} />
                </ActionTooltip>
                {currentTrack === track.id ? (
                  <AudioLines className='w-4 h-4' />
                ) : (
                  <ActionTooltip label="Play">
                    <PlayCircle className='cursor-pointer w-4 h-4' onClick={() => handlePlay(track)} />
                  </ActionTooltip>
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