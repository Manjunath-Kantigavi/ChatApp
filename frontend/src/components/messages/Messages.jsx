import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const lastMsgRef = useRef();

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 40 }}>
          <span className="loading loading-spinner" style={{ color: "#3b82f6" }}></span>
        </div>
      ) : messages.length === 0 ? (
        <div style={{ textAlign: "center", paddingTop: 40, color: "#475569", fontSize: 13 }}>
          No messages yet. Say hi! 👋
        </div>
      ) : (
        <>
          {messages.map(msg => <Message key={msg._id} message={msg} />)}
          <div ref={lastMsgRef} />
        </>
      )}
    </div>
  );
};

export default Messages;