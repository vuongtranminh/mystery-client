'use client'

import React from 'react'
import YouTube from 'react-youtube';
import { ScrollArea } from './ui/scroll-area';

const CinemaRoom = () => {
  return (
    <div className='h-full w-full relative'>
      <YouTube
        className='h-full w-full'
        videoId={'UEFdNrQ7kWo'}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 1,
          },
        }}
      />
      <div className='absolute inset-0'>
        <div className='absolute bottom-10 left-2'>
          <ScrollArea className='h-40 w-48'>
            <div><span>10:20</span> hhhhhhh</div>
            <div><span>10:20</span> hhhhhhh</div>
            <div><span>10:20</span> hhhhhhh</div>
            <div><span>10:20</span> hhhhhhh</div>
            <div><span>10:20</span> hhhhhhh</div>
            <div><span>10:20</span> hhhhhhh</div>
            <div><span>10:20</span> hhhhhhh</div>
            <div><span>10:20</span> hhhhhhh</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default CinemaRoom