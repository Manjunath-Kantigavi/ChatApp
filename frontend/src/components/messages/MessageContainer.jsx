import { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const initials = selectedConversation?.fullName
    ?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  if (!selectedConversation) return <NoChatSelected />;

  return (
    <div style={{
      flex: 1, background: "#080b12",
      display: "flex", flexDirection: "column",
      height: "100%", overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px",
        background: "#0a0d17",
        borderBottom: "0.5px solid #1e2030",
        flexShrink: 0,
        minHeight: 64,
      }}>
        {/* Back button — mobile only */}
        {isMobile && (
          <button
            onClick={() => setSelectedConversation(null)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#1a1d2e",
              border: "0.5px solid #1e2030",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#94a3b8", flexShrink: 0
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        )}

        {/* Avatar */}
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
          <img
            src={selectedConversation.profilePic}
            alt={selectedConversation.fullName}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              objectFit: "cover", display: "block"
            }}
            onError={e => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "#1e3a5f", color: "#60a5fa",
            display: "none", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 500,
            position: "absolute", top: 0, left: 0,
          }}>{initials}</div>
          <span style={{
            position: "absolute", bottom: 0, right: 0,
            width: 10, height: 10, borderRadius: "50%",
            background: isOnline ? "#22c55e" : "#475569",
            border: "2px solid #0a0d17", display: "block"
          }} />
        </div>

        {/* Name + status */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 15, fontWeight: 600, color: "#e2e8f0",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
          }}>
            {selectedConversation.fullName}
          </div>
          <div style={{ fontSize: 12, color: isOnline ? "#22c55e" : "#64748b", marginTop: 2 }}>
            {isOnline ? "● Online" : "● Offline"}
          </div>
        </div>
      </div>

      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center",
      justifyContent: "center", background: "#080b12"
    }}>
      <div style={{ textAlign: "center", padding: "0 20px" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: "#1e3a5f",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px"
        }}>
          <svg width="28" height="28" fill="none" stroke="#60a5fa" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#e2e8f0" }}>
          Welcome, {authUser?.fullName}! 👋
        </div>
        <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>
          Select a conversation to start chatting
        </div>
      </div>
    </div>
  );
};