import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { authUser } = useAuthContext();

  const initials = authUser?.fullName
    ?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0f1117",
      display: "flex", flexDirection: "column",
      borderRight: "0.5px solid #1e2030",
    }}>
      {/* Me bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "14px 16px",
        borderBottom: "0.5px solid #1e2030",
        flexShrink: 0, minHeight: 64,
      }}>
        {/* Avatar with fallback */}
        <div style={{ position: "relative", flexShrink: 0, width: 36, height: 36 }}>
          <img
            src={authUser?.profilePic}
            alt={authUser?.fullName}
            style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", display: "block" }}
            onError={e => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#1e3a5f", color: "#60a5fa",
            display: "none", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 500,
            position: "absolute", top: 0, left: 0
          }}>{initials}</div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: "#e2e8f0",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
          }}>
            {authUser?.fullName}
          </div>
          <div style={{ fontSize: 11, color: "#22c55e", marginTop: 1 }}>● Active</div>
        </div>
        <LogoutButton />
      </div>

      {/* Search */}
      <div style={{ padding: "12px 16px", flexShrink: 0 }}>
        <SearchInput />
      </div>

      {/* Section label */}
      <div style={{
        fontSize: 10, fontWeight: 600, color: "#475569",
        letterSpacing: "0.08em", textTransform: "uppercase",
        padding: "0 16px 8px", flexShrink: 0
      }}>
        Chats
      </div>

      {/* Conversations */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Conversations />
      </div>
    </div>
  );
};

export default Sidebar;