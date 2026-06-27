import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "16px 20px", background: "#0a0d17", borderTop: "0.5px solid #1e2030" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "#1a1d2e", border: "0.5px solid #1e2030",
        borderRadius: 14, padding: "8px 8px 8px 16px"
      }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            color: "#e2e8f0", fontSize: 13, fontFamily: "inherit"
          }}
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          style={{
            width: 36, height: 36, borderRadius: 10, background: "#1d4ed8",
            border: "none", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0, opacity: !message.trim() ? 0.5 : 1
          }}
        >
          {loading
            ? <span className="loading loading-spinner" style={{ width: 14, height: 14, color: "#fff" }}></span>
            : <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
          }
        </button>
      </div>
    </form>
  );
};

export default MessageInput;