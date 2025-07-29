import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";

// PUBLIC_INTERFACE
function RegisterPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, username);
      nav("/");
    } catch (e) {
      setErr("Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 370, margin: "54px auto", background: "#fff", padding: 30, borderRadius: 16, boxShadow: "0 4px 16px #eee" }}>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div style={{ margin: "16px 0" }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 17 }} required />
        </div>
        <div style={{ margin: "16px 0" }}>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Username" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 17 }} required />
        </div>
        <div style={{ margin: "16px 0" }}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 17 }} required />
        </div>
        {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
        <button type="submit" style={{ background: "#FF0000", color: "white", width: "100%", border: "none", borderRadius: 16, padding: "11px 0", fontWeight: 600, fontSize: 17 }}>
          Register
        </button>
        <div style={{ marginTop: 18, textAlign: "center" }}>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}
export default RegisterPage;
