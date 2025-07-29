import React from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../api";

// PUBLIC_INTERFACE
function Sidebar() {
  const nav = useNavigate();
  const user = getLoggedInUser();

  const sidebarStyle = {
    background: "#fff",
    borderRight: "1px solid var(--border-color)",
    paddingTop: 20,
    minWidth: 180,
    maxWidth: 225,
    minHeight: "100vh",
    boxSizing: "border-box",
  };
  const navItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    cursor: "pointer",
    border: "none",
    background: "none",
    color: "#333",
    fontWeight: 500,
    padding: "10px 25px",
    fontSize: 17,
    borderRadius: 15,
    marginBottom: 10,
    transition: "background 0.2s"
  };

  return (
    <aside className="sidebar" style={sidebarStyle}>
      <nav>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <button style={navItemStyle} onClick={() => nav("/")}>
              <span role="img" aria-label="home">🏠</span> Home
            </button>
          </li>
          {user && (
            <>
              <li>
                <button style={navItemStyle} onClick={() => nav("/upload")}>
                  <span role="img" aria-label="upload">⏫</span> Upload
                </button>
              </li>
              <li>
                <button style={navItemStyle} onClick={() => nav("/profile")}>
                  <span role="img" aria-label="user">👤</span> Profile
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
