"use client"

import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useCinema } from '../cinema-room';
import PeerService from '@/app/api/peer.api';

const Player = () => {

  const cinema = useCinema()
  const { queue, currentTrack, currentTrackTime, state } = cinema.player;
  const {peers} = cinema.app;
  const player = useRef(null);
  const [lastInteract, setLastInteract] = useState(new Date().getTime());
  const [playerReady, setPlayerReady] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (state === YouTube.PlayerState.PLAYING) {
      player.current?.internalPlayer.playVideo();
    } else if (state === YouTube.PlayerState.PAUSED) {
      player.current?.internalPlayer.pauseVideo();
    }
  }, [state]);

  useEffect(() => {
    if (peers.length === 0) setReady(true);
  }, [peers]);

  useEffect(() => {
    PeerService.onData.addListener(async (data, conn) => {
      const parsedData = JSON.parse(decodeURIComponent(data));
      if (parsedData.action === 'sync-player' && parsedData.data.timestamp > lastInteract && ready) {
        setReady(true);
        const trackTime = await player.current?.internalPlayer.getCurrentTime();
        const timeDiff = Math.abs(parsedData.data.currentTrackTime - trackTime);
        if (timeDiff > 5) {
          player.current?.internalPlayer.seekTo(parsedData.data.currentTrackTime);
        }
      }
    });
  }, []);

  useEffect(() => {
    player.current?.internalPlayer.seekTo(currentTrackTime || 0);
  }, [playerReady]);

  return (
    <div className='rounded-lg border bg-card text-card-foreground shadow-sm h-full w-full'>
      {queue.length === 0 ? <div></div> :
        <YouTube
          ref={player}
          videoId={currentTrack}
          opts={{
            height: '400',
            width: '100%',
            playerVars: {
              autoplay: 1,
            },
          }}
          onReady={(event) => {
            console.log('on-ready', event);
            setPlayerReady(true);
          }}
          onPlay={event => {
            console.log('on-play', event);
            setLastInteract(new Date().getTime())
          }}
          onStateChange={async event => {
            const state = event.data;

            if (state === YouTube.PlayerState.PLAYING || state === YouTube.PlayerState.PAUSED) {
              const timestamp = new Date().getTime();
              if (timestamp - lastInteract < 500) return;
              const trackTime = await event.target.getCurrentTime();
              // send to other clients
              PeerService.sendAll(encodeURIComponent(JSON.stringify({
                action: 'sync-player',
                data: {
                  currentTrack,
                  currentTrackTime: trackTime,
                  state,
                  timestamp,
                },
              })));
              console.log('send-sync');
              setLastInteract(timestamp);
            }
          }}
          onEnd={(event) => {
            cinema.player.moveToNextTrack()
          }}
        />
      }
    </div>
  )
}

export default Player