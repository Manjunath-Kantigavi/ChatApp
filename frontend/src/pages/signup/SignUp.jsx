import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [formData, setFormData] = useState({ fullName: "", username: "", password: "", confirmPassword: "", gender: "male" });
  const { loading, signup } = useSignup();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async e => { e.preventDefault(); await signup(formData); };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    background: "#1a1d2e", border: "0.5px solid #1e2030",
    color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "inherit"
  };
  const labelStyle = { fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 };

  return (
    <div style={{ width: 380 }}>
      <div style={{
        background: "#0f1117", border: "0.5px solid #1e2030",
        borderRadius: 16, padding: 32, boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#e2e8f0" }}>Create account</div>
          <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>Join ChatApp today</div>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "fullName", type: "text", placeholder: "John Doe" },
            { label: "Username", name: "username", type: "text", placeholder: "johndoe" },
            { label: "Password", name: "password", type: "password", placeholder: "Min. 6 characters" },
            { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Repeat password" },
          ].map(field => (
            <div key={field.name} style={{ marginBottom: 14 }}>
              <label style={labelStyle}>{field.label}</label>
              <input
                type={field.type} name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          ))}

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Gender</label>
            <div style={{ display: "flex", gap: 16 }}>
              {["male", "female"].map(g => (
                <label key={g} style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>
                  <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} style={{ accentColor: "#1d4ed8" }} />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: 11, borderRadius: 10,
            background: "#1d4ed8", border: "none", color: "#fff",
            fontSize: 14, fontWeight: 500, cursor: "pointer"
          }}>
            {loading ? <span className="loading loading-spinner" style={{ width: 16, height: 16 }}></span> : "Create account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#475569" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#3b82f6", textDecoration: "none" }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;