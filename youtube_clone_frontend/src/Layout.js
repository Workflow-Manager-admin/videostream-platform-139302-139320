import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// PUBLIC_INTERFACE
function Layout({ children }) {
  return (
    <div className="app-shell" style={{display: "flex", minHeight: "100vh", background: "var(--bg-secondary)"}}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main className="main-content" style={{flex: 1, padding: "1rem 0"}}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
