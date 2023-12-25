'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import { ScrollArea } from './ui/scroll-area';
import Player from './cinema/player';
import QueueCard from './cinema/queue-card';
import { useAuth } from './providers/auth-provider';

const CinemaContext = createContext({
  app: {
    profile: {}, // Profile
    peers: [], // Profile[]
    voicePermitted: false,
  },
  player: {
    queue: [], // Track[]
    currentTrack: null, // string
    currentTrackTime: null, // number
    state: 0, // number
  },
  chat: {
    messages: [], // chatMessage[]
  }
});

export const useCinema = () => {
  return useContext(CinemaContext);
};

const CinemaRoom = ({
  chatId
}) => {
  const { user } = useAuth();

  return (
    <CinemaContext.Provider value={{}}>
      <div className='h-full w-full grid grid-cols-4 grid-rows-2 gap-1'>
        <div className='col-span-3 row-span-2'>
          <Player />
        </div>
        <div className='col-span-1 row-span-1'>
          <QueueCard />
        </div>
        <div className='col-span-1 row-span-1'>
        </div>
      </div>
    </CinemaContext.Provider>
  )
}

export default CinemaRoom