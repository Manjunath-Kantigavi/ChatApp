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
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!authUser) {
      // cleanup if logged out
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        setSocket(null);
      }
      return;
    }

    // close existing before creating new
    if (socketRef.current) {
      socketRef.current.close();
    }

    const newSocket = io(SOCKET_URL, {
      query: { userId: authUser._id },
      withCredentials: true,
      transports: ["polling", "websocket"], //  try websocket first, fallback to polling
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    newSocket.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [authUser?._id]); 

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};