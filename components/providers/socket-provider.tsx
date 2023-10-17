"use client";

import { 
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

const PING_TIMEOUT_DELAY = 3000;
const RECONNECTION_DELAY = 3000;

export const SocketProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [shouldReconnect, setShouldReconnect] = useState(true);
  const pingTimeoutTimer = useRef(null);
  const reconnectTimer = useRef(null);

  useEffect(() => {

    const onOpen = () => {
      const socketInstance = new WebSocket("ws://localhost:8080/handle/9fad9a7d-1a1b-47f2-9cea-66abb7719968");

      setSocket(socketInstance);

      socketInstance.addEventListener("open", (event) => {
        setIsConnected(true);
        
        resetPingTimeout();
      });
  
      socketInstance.addEventListener("message", (event) => {
        const { data } = event;
        if (data === "pong") {
          resetPingTimeout();
          send("ping")
        }
      });
  
      socketInstance.addEventListener("close", (event) => {
        setIsConnected(false);
      });
    }

    const onClose = (reason) => {
      if (socketInstance) {
        socket.close();
      }

      clearTimeout(pingTimeoutTimer.current);
      clearTimeout(reconnectTimer.current);

      setIsConnected(false);

      if (shouldReconnect) {
        reconnectTimer.current = setTimeout(() => {
          onOpen();
        }, RECONNECTION_DELAY);
      }
    }

    const send = (data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
      }
    }

    const resetPingTimeout = () => {
      clearTimeout(pingTimeoutTimer.current);
      pingTimeoutTimer.current = setTimeout(() => {
        onClose("ping timeout");
      }, PING_TIMEOUT_DELAY);
    }

    const disconnect = () => {
      setShouldReconnect(false);
      socket.close();
    }

    return () => {
      disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}