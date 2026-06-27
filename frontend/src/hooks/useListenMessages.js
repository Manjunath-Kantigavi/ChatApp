import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // only add if it's from the currently selected conversation
      if (
        newMessage.senderId === selectedConversation?._id ||
        newMessage.receiverId === selectedConversation?._id
      ) {
        setMessages([...messages, newMessage]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, messages, setMessages, selectedConversation?._id]);
};

export default useListenMessages;