import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  const initials = conversation.fullName
    ?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#1a1d2e" }}
      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent" }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 10px",
        borderRadius: "10px",
        cursor: "pointer",
        marginBottom: "2px",
        background: isSelected ? "#1e3a5f" : "transparent",
        transition: "background 0.15s",
      }}
    >
      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
        <img
          src={conversation.profilePic}
          alt={conversation.fullName}
          style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", display: "block" }}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: isSelected ? "#1d4ed8" : "#1e2030",
          color: isSelected ? "#fff" : "#94a3b8",
          display: "none", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 500, position: "absolute", top: 0, left: 0
        }}>{initials}</div>
        <span style={{
          position: "absolute", bottom: 1, right: 1,
          width: 9, height: 9, borderRadius: "50%",
          background: isOnline ? "#22c55e" : "#475569",
          border: "1.5px solid #0f1117",
          display: "block"
        }} />
      </div>

      {/* Name + status */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 500, color: "#e2e8f0",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
        }}>
          {conversation.fullName}
        </div>
        <div style={{ fontSize: 11, color: isOnline ? "#22c55e" : "#475569", marginTop: 2 }}>
          {isOnline ? "● Online" : "● Offline"}
        </div>
      </div>

      <span style={{ fontSize: 16, flexShrink: 0 }}>{emoji}</span>
    </div>
  );
};

export default Conversation;