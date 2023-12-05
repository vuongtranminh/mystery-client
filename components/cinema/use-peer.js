"use client"

import React from 'react'
import { useAuth } from '../providers/auth-provider';
import { useCinema } from '../cinema-room';

const UsePeer = () => {
  const { user } = useAuth();
  const { app, player } = useCinema();

  useEffect(() => {
    PeerService.disconnect();
    if (user && user.userId) {
      PeerService.initialize(user.userId);
      PeerService.onConnection.addListener((conn, isIncoming) => {
        const {currentTrack, currentTrackTime} = store.getState().player;
        app.addPeer(conn.connectionId);
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
            app.updatePeerProfile({
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
            dispatch(enqueueTrack(parsedData.data));
            break;
          case 'queue':
            dispatch(syncQueue(parsedData.data));
            break;
          case 'sync-player':
            dispatch(syncPlayer(parsedData.data));
            break;
          case 'update-player':
            dispatch(updatePlayer(parsedData.data));
            break;
          case 'remove-track':
            dispatch(removeTrack(parsedData.data));
            break;
        }
      });
      PeerService.onClose.addListener(conn => {
        app.removePeer(conn.connectionId)
      });
    }
    return () => {
      PeerService.disconnect();
    }
  }, [user?.userId]);
}

export default UsePeer