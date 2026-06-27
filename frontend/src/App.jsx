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
      minHeight: "100svh", width: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#080b12"
    }}>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster position="top-center" toastOptions={{
        style: { background: "#1a1d2e", color: "#e2e8f0", border: "0.5px solid #1e2030" }
      }} />
    </div>
  );
}

export default App;