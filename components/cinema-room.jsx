'use client'

import React, { createContext, useContext, useState } from 'react'
import YouTube from 'react-youtube';
import { ScrollArea } from './ui/scroll-area';
import Player from './cinema/player';
import QueueCard from './cinema/queue-card';
import ChatBox from './cinema/chat-box';

// export interface ChatMessage {
//   author: Profile;
//   text: string;
//   time: number;
// }

// export interface Track {
//   id: string;
//   title: string;
//   picture: string;
//   duration: number;
//   source?: string;
//   creationTime: number;
// }

// export interface Profile {
//   status?: 'calling' | 'idle';
//   name?: string;
//   icon?: string;
//   userId?: string;
//   connectionId: string;
//   hasVoice?: string;
//   voiceConnected?: boolean;
//   voiceConnection?: MediaConnection;
//   muted?: boolean;
// }

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

const CinemaRoom = () => {
  const [app, setApp] = useState({
    profile: {},
    peers: [],
    voicePermitted: false,
  });
  const [player, setPlayer] = useState({
    queue: [], // Track[]
    currentTrack: null, // string
    currentTrackTime: null, // number
    state: 0, // number
  });

  const [chat, setChat] = useState({
    messages: [], // chatMessage[]
  })

  // app
  const addPeer = (peerId) => {
    if (!app.peers.find(peer => peer.peerId === peerId)) {
      setApp(prev => ({
        ...prev,
        peers: [...prev.peers, {
          connectionId: peerId
        }]
      }))
    }
  }

  const updatePeerProfile = ({ profile, connectionId }) => {
    const peersUpdate = [...app.peers].map(peer => {
      if (peer.connectionId === connectionId) {
        if (profile.icon) peer.icon = profile.icon;
        if (profile.name) peer.name = profile.name;
        if (profile.username) peer.username = profile.username;
        if (profile.hasVoice) peer.hasVoice = profile.hasVoice;
      }
      return peer;
    });
    setApp({
      ...app,
      peers: peersUpdate
    })
  }

  const removePeer = (connectionId) => {
    app.peers = app.peers.filter(peer => {
      return peer.connectionId !== connectionId;
    });
  }

  // player
  

  return (
    <CinemaContext.Provider value={{ 
      app: {
        ...app,
        addPeer,
        updatePeerProfile,
        removePeer
      }, 
      player: {
        ...player,
      }
    }}>
      <div className='h-full w-full grid grid-cols-4 gap-1'>
        <div className='col-span-3'>
          <Player />
        </div>
        <div className='col-span-1'>
          <div className=''>
            <QueueCard />
          </div>
          <div>
            <ChatBox />
          </div>
        </div>
      </div>
    </CinemaContext.Provider>
  )
}

export default CinemaRoom