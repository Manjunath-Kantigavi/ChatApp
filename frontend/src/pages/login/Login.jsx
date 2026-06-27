import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div style={{ width: 380 }}>
      <div style={{
        background: "#0f1117", border: "0.5px solid #1e2030",
        borderRadius: 16, padding: 32, boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#e2e8f0" }}>
            Welcome back
          </div>
          <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>
            Sign in to ChatApp
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>Username</label>
            <input
              type="text" placeholder="Enter username" value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10,
                background: "#1a1d2e", border: "0.5px solid #1e2030",
                color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "inherit"
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>Password</label>
            <input
              type="password" placeholder="Enter password" value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10,
                background: "#1a1d2e", border: "0.5px solid #1e2030",
                color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "inherit"
              }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "11px", borderRadius: 10,
            background: "#1d4ed8", border: "none", color: "#fff",
            fontSize: 14, fontWeight: 500, cursor: "pointer"
          }}>
            {loading ? <span className="loading loading-spinner" style={{ width: 16, height: 16 }}></span> : "Sign in"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#475569" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#3b82f6", textDecoration: "none" }}>Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;