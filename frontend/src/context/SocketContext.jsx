import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

const SOCKET_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5000"
  : "https://chatapp-backend-50p5.onrender.com";

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authUser) {
      socketRef.current = io(SOCKET_URL, {
        query: { userId: authUser._id },
        withCredentials: true,
      });

      socketRef.current.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
    }

    return () => {
      socketRef.current?.close();
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};