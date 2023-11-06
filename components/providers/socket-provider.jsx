"use client";

import { 
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import Socket from "@/lib/socket";
import { useAuth } from "./auth-provider";

const SocketContext = createContext({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.userId) {
      const socketInstance = new Socket(`ws://localhost:8080/myHandler/${user.userId}`, {
        pingTimeoutDelay: 1000,
        pingDisconnectTimeoutDelay: 3000,
        reconnectionDelay: 1000
      })
  
      setSocket(socketInstance);
    }

    return () => {
      socketInstance.disconnect();
    }
  }, [user?.userId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}