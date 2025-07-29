import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";

// PUBLIC_INTERFACE
function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/");
    } catch (e) {
      setErr("Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 370, margin: "54px auto", background: "#fff", padding: 30, borderRadius: 16, boxShadow: "0 4px 16px #eee" }}>
      <h2>Sign In</h2>
      <form onSubmit={onSubmit}>
        <div style={{ margin: "16px 0" }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 17 }} required />
        </div>
        <div style={{ margin: "16px 0" }}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 17 }} required />
        </div>
        {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
        <button type="submit" style={{ background: "#FF0000", color: "white", width: "100%", border: "none", borderRadius: 16, padding: "11px 0", fontWeight: 600, fontSize: 17 }}>
          Login
        </button>
        <div style={{ marginTop: 18, textAlign: "center" }}>
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
