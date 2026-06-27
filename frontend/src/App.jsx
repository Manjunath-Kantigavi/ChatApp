import { Toaster } from "react-hot-toast";
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import './App.css';
import Signup from './pages/signup/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div style={{
      height: "100svh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      background: "#080b12",
      overflow: "hidden"
    }}>
      {/* Header — only show on login/signup, hide when in chat */}
      {!authUser && (
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 24px",
          background: "#0f1117",
          borderBottom: "0.5px solid #1e2030",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: "#1d4ed8",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>
              Chat<span style={{ color: "#3b82f6" }}>App</span>
            </span>
          </div>
          <span style={{ fontSize: 12, color: "#475569" }}>Real-time messaging</span>
        </header>
      )}

      {/* Main content */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to="/" /> : <Signup />} />
        </Routes>
      </div>

      <Toaster position="top-center" toastOptions={{
        style: { background: "#1a1d2e", color: "#e2e8f0", border: "0.5px solid #1e2030" }
      }} />
    </div>
  );
}

export default App;