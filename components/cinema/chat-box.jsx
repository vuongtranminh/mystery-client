import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import React, { useEffect, useState } from 'react'
import { Chat } from './chat'
import { useAuth } from '../providers/auth-provider';
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { ChatToggle } from './chat-toggle';

const ChatBox = ({
  chatId,
}) => {
  const { user } = useAuth();
  const [token, setToken] = useState("");
  const { collapsed } = useChatSidebar((state) => state);

  useEffect(() => {
    if (!user?.name) return;

    const name = user?.name;

    (async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    })()
  }, [user?.name, chatId]);

  if (!token === "") {
    return "<StreamPlayerSkeleton />"
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={false}
        audio={false}
      >
        <Chat />
      </LiveKitRoom>
    </>
  )
}

export default ChatBox