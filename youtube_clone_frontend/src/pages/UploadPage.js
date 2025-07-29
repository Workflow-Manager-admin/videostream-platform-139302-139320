import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, uploadVideo } from "../api";

// PUBLIC_INTERFACE
function UploadPage() {
  const user = getLoggedInUser();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !desc || !file) {
      setErr("All fields are required.");
      return;
    }
    uploadVideo({ title, description: desc, file, userId: user.id })
      .then((vid) => nav(`/video/${vid.id}`))
      .catch(() => setErr("Upload failed."));
  };

  return (
    <div style={{ maxWidth: 430, margin: "34px auto", background: "#fff", padding: 34, borderRadius: 14, boxShadow: "0 6px 22px #eee" }}>
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "13px 0" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 17 }}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ margin: "13px 0" }}>
          <textarea
            placeholder="Description"
            value={desc}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 16, minHeight: 80 }}
            onChange={e => setDesc(e.target.value)}
            required
          />
        </div>
        <div style={{ margin: "13px 0" }}>
          <input
            type="file"
            accept="video/*"
            onChange={e => setFile(e.target.files[0])}
            required
            style={{ fontSize: 15 }}
          />
        </div>
        {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
        <button type="submit" style={{ background: "#FF0000", color: "white", width: "100%", border: "none", borderRadius: 16, padding: "11px 0", fontWeight: 600, fontSize: 17 }}>Upload</button>
      </form>
    </div>
  );
}

export default UploadPage;
