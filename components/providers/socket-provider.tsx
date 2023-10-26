"use client";

import { 
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import Socket from "@/lib/socket";

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

export const SocketProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new Socket("ws://localhost:8080/myHandler/9fad9a7d-1a1b-47f2-9cea-66abb7719968", {
      pingTimeoutDelay: 1000,
      pingDisconnectTimeoutDelay: 3000,
      reconnectionDelay: 1000
    })

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}