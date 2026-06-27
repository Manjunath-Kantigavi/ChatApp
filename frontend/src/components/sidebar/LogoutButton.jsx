import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <button
      onClick={logout}
      disabled={loading}
      aria-label="Logout"
      style={{
        width: 28, height: 28, borderRadius: 8, background: "transparent",
        border: "0.5px solid #1e2030", display: "flex", alignItems: "center",
        justifyContent: "center", cursor: "pointer", color: "#64748b", flexShrink: 0
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "#1e2030"; e.currentTarget.style.color = "#e2e8f0" }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
    >
      {loading
        ? <span className="loading loading-spinner" style={{ width: 14, height: 14 }}></span>
        : <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
      }
    </button>
  );
};

export default LogoutButton;