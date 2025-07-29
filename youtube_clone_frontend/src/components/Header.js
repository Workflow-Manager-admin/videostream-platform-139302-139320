import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, logout } from "../api";

// PUBLIC_INTERFACE
function Header() {
  const [search, setSearch] = useState("");
  const user = getLoggedInUser();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/?search=" + encodeURIComponent(search));
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header
      className="header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-color)",
        padding: "0.5rem 2rem",
        minHeight: 64,
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <span
          style={{
            fontWeight: "bold",
            color: "#FF0000",
            fontSize: 26,
          }}
        >
          <span style={{ color: "#FF0000" }}>▶</span> YouTube<span style={{ color: "#282828" }}>Clone</span>
        </span>
      </div>

      <form onSubmit={handleSearch} style={{ flex: 1, margin: "0 2rem" }}>
        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "70%",
            maxWidth: 380,
            padding: "0.5rem 1rem",
            border: "1px solid var(--border-color)",
            borderRadius: 22,
            fontSize: 16,
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: 12,
            padding: "0.5rem 1.5rem",
            background: "#FF0000",
            color: "white",
            border: "none",
            borderRadius: 22,
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      <div>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <span style={{
              background: "#FF0000",
              color: "white",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 500,
              fontSize: 19,
              letterSpacing: 1.3,
              cursor: "pointer"
            }} onClick={() => navigate("/profile")}>
              {user.username ? user.username[0].toUpperCase() : "U"}
            </span>
            <button onClick={handleLogout} style={{
              background: "#ddd", border: "none",
              borderRadius: 14, color: "#282828",
              fontWeight: 600, padding: "4px 14px", cursor: "pointer"
            }}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              style={{
                background: "#FF0000",
                color: "white",
                border: "none",
                borderRadius: 16,
                padding: "8px 26px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
