'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import { ScrollArea } from './ui/scroll-area';
import Player from './cinema/player';
import QueueCard from './cinema/queue-card';
import ChatBox from './cinema/chat-box';
import { useAuth } from './providers/auth-provider';
import PeerService from '@/app/api/peer.api';

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
  const { user } = useAuth();

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
  const syncQueue = (queue) => {
    let queueUpdate = [...player.queue];
    queue.forEach(track => {
      if (!player.queue.find(x => x.id === track.id)) {
        queueUpdate.push(track);
      }
    });

    queueUpdate = queueUpdate.sort((a, b) => {
      return a.creationTime - b.creationTime;
    })

    setPlayer({
      ...player,
      queue: queueUpdate
    })
  }

  const syncPlayer = ({ currentTrack, currentTrackTime }) => {
    const playerUpdate = { ...player }
    if (currentTrack) playerUpdate.currentTrack = currentTrack;
    if (currentTrackTime) playerUpdate.currentTrackTime = currentTrackTime;
    setPlayer(playerUpdate)
  }

  const updatePlayer = (state) => {
    setPlayer({
      ...player,
      state: state
    })
  }

  const moveToNextTrack = () => {
    const playerUpdate = { ...player }
    playerUpdate.currentTrackTime = 0;
    const currentIndex = playerUpdate.queue.findIndex(t => t.id === playerUpdate.currentTrack);
    if (currentIndex === playerUpdate.queue.length - 1) {
      // end of queue, move to first
      playerUpdate.currentTrack = playerUpdate.queue[0].id;
    } else {
      playerUpdate.currentTrack = playerUpdate.queue[currentIndex + 1].id;
    }
    setPlayer(playerUpdate)
  }

  const removeTrack = (trackId) => {
    const playerUpdate = { ...player }
    if (playerUpdate.currentTrack === trackId) {
      // move to next track
      const curIndex = playerUpdate.queue.findIndex(t => t.id === playerUpdate.currentTrack);
      if (curIndex === playerUpdate.queue.length - 1) {
        // end of queue, move to first
        playerUpdate.currentTrack = playerUpdate.queue[0].id;
      } else {
        playerUpdate.currentTrack = playerUpdate.queue[curIndex + 1].id;
      }
    }
    playerUpdate.queue = playerUpdate.queue.filter(item => item.id !== trackId);
    setPlayer(playerUpdate)
  }

  const enqueueTrack = (track) => {
    const playerUpdate = { ...player }
    playerUpdate.queue.push(track);
    if (playerUpdate.queue.length === 1) {
      playerUpdate.currentTrack = track.id;
      playerUpdate.currentTrackTime = 0;
    }

    setPlayer(playerUpdate)
  }

  useEffect(() => {
    PeerService.disconnect();
    if (user && user.userId) {
      PeerService.initialize(user.userId);
      PeerService.onConnection.addListener((conn, isIncoming) => {
        const {currentTrack, currentTrackTime} = store.getState().player;
        addPeer(conn.connectionId);
        conn.send(encodeURIComponent(JSON.stringify({
          action: 'profile',
          data: {
            ...profile,
            userId: user.userId,
            hasVoice: voicePermitted,
          }
        })));
        conn.send(encodeURIComponent(JSON.stringify({
          action: 'peers',
          data: app.peers
        })));
        conn.send(encodeURIComponent(JSON.stringify({
          action: 'queue',
          data: player.queue
        })));
        if (isIncoming) {
          message.info(conn.peer + " has just connected.").then(() => null);
          conn.send(encodeURIComponent(JSON.stringify({
            action: 'sync-player',
            data: {
              currentTrack,
              currentTrackTime,
            }
          })));
        }
      });
      PeerService.onData.addListener((data, conn) => {
        const parsedData = JSON.parse(decodeURIComponent(data));
        switch (parsedData.action) {
          case 'profile':
            updatePeerProfile({
              profile: parsedData.data,
              connectionId: conn.connectionId,
            });
            break;
          case 'peers':
            const connectedPeers = app.peers || [];
            const peersList = parsedData.data;
            peersList.forEach((peer) => {
              if (!peer || !peer.userId) return;
              if (!connectedPeers.find((p) => p.userId === peer.userId)) {
                PeerService.connect(peer.userId).then(() => null);
              }
            });
            break;
          case 'message':
            dispatch(addMessage(parsedData.data));
            break;
          case 'enqueue':
            enqueueTrack(parsedData.data);
            break;
          case 'queue':
            syncQueue(parsedData.data);
            break;
          case 'sync-player':
            syncPlayer(parsedData.data);
            break;
          case 'update-player':
            updatePlayer(parsedData.data);
            break;
          case 'remove-track':
            removeTrack(parsedData.data);
            break;
        }
      });
      PeerService.onClose.addListener(conn => {
        removePeer(conn.connectionId)
      });
    }
    return () => {
      PeerService.disconnect();
    }
  }, [user?.userId]);

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
        syncQueue,
        syncPlayer,
        updatePlayer,
        moveToNextTrack,
        removeTrack,
        enqueueTrack
      }
    }}>
      <div className='h-full w-full grid grid-cols-4 grid-rows-2 gap-1'>
        <div className='col-span-3 row-span-2'>
          <Player />
        </div>
        <div className='col-span-1 row-span-1'>
          <QueueCard />
        </div>
        <div className='col-span-1 row-span-1'>
          <ChatBox />
        </div>
      </div>
    </CinemaContext.Provider>
  )
}

export default CinemaRoom