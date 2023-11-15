"use client";

import { 
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import Socket from "@/lib/socket";

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

  // useEffect(() => {
  //   const socketInstance = new Socket(`ws://localhost:8080/myHandler/${user.userId}`, {
  //       pingTimeoutDelay: 1000,
  //       pingDisconnectTimeoutDelay: 3000,
  //       reconnectionDelay: 1000
  //     })
  
  //   setSocket(socketInstance);

  //   return () => {
  //     socketInstance.disconnect();
  //   }
  // }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}