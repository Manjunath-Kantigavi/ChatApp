import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;

  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const initials = (fromMe ? authUser.fullName : selectedConversation?.fullName)
    ?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const time = new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{
      display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 12,
      flexDirection: fromMe ? "row-reverse" : "row"
    }}>
      {profilePic ? (
        <img src={profilePic} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
      ) : (
        <div style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
          background: "#1e3a5f", color: "#60a5fa",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 500
        }}>{initials}</div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: "65%", alignItems: fromMe ? "flex-end" : "flex-start" }}>
        <div style={{
          padding: "10px 14px", borderRadius: 16, fontSize: 13, lineHeight: 1.5,
          background: fromMe ? "#1d4ed8" : "#1a1d2e",
          color: "#e2e8f0",
          borderBottomRightRadius: fromMe ? 4 : 16,
          borderBottomLeftRadius: fromMe ? 16 : 4,
        }}>
          {message.message}
        </div>
        <div style={{ fontSize: 10, color: "#475569", padding: "0 2px" }}>{time}</div>
      </div>
    </div>
  );
};

export default Message;