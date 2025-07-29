import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { listVideos } from "../api";

// PUBLIC_INTERFACE
function HomePage() {
  const nav = useNavigate();
  const search = new URLSearchParams(useLocation().search).get("search") || "";
  const videos = listVideos(search);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
      <h2 style={{ marginTop: 20, color: "#282828" }}>
        {search ? `Results for "${search}"` : "Trending Videos"}
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          marginTop: 18,
        }}
      >
        {videos.length === 0 ? (
          <div style={{ color: "gray", marginTop: 44 }}>No videos found.</div>
        ) : (
          videos.map((v) => (
            <div
              key={v.id}
              style={{
                width: 320,
                background: "#fafafa",
                border: "1px solid #eee",
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 16px 0 rgba(210,210,210,0.06)",
                transition: "box-shadow 0.2s"
              }}
              onClick={() => nav(`/video/${v.id}`)}
            >
              <div style={{ height: 180, background: "#E2E2E2" }}>
                <video
                  src={v.url}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  controls={false}
                  preload="metadata"
                  muted
                  poster=""
                />
              </div>
              <div style={{ padding: "15px" }}>
                <h4 style={{ margin: "4px 0", color: "#111", fontWeight: 600, fontSize: 19 }}>{v.title}</h4>
                <div style={{ color: "#888", fontSize: 15 }}>
                  by <b>{v.username}</b> • {new Date(v.uploadedAt).toLocaleDateString()}
                </div>
                <div style={{ color: "#555", fontSize: 16, marginTop: 7 }}>
                  {v.description?.slice(0, 75)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
