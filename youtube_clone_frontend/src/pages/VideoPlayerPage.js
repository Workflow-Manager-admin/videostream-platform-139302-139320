import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getVideoById, likeVideo, dislikeVideo,
  getLoggedInUser, addComment, getComments,
  subscribeToUser, getRecommendations
} from "../api";

// PUBLIC_INTERFACE
function VideoPlayerPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const video = getVideoById(id);
  const user = getLoggedInUser();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(getComments(id));
  const [liked, setLiked] = useState(video?.likes?.includes(user?.id));
  const [disliked, setDisliked] = useState(video?.dislikes?.includes(user?.id));
  const [subscribed, setSubscribed] = useState(
    (user?.subscriptions || []).includes(video?.userId)
  );

  if (!video) {
    return <div style={{ margin: 40, color: "#992222" }}>Video not found.</div>;
  }

  function handleLike() {
    if (!user) return;
    likeVideo(id, user.id);
    setLiked(true);
    setDisliked(false);
  }

  function handleDislike() {
    if (!user) return;
    dislikeVideo(id, user.id);
    setDisliked(true);
    setLiked(false);
  }

  function handleComment(e) {
    e.preventDefault();
    if (!user) return;
    const newComments = addComment(id, comment, user.username);
    setComments([...newComments]);
    setComment("");
  }

  function handleSubscribe() {
    if (!user) return;
    subscribeToUser(video.userId, user.id);
    setSubscribed(true);
  }

  const recommendations = getRecommendations(id);

  return (
    <div style={{ display: "flex", gap: 32, maxWidth: 1200, margin: "32px auto" }}>
      <div style={{ flex: 2 }}>
        <div style={{ background: "#222", borderRadius: 9, marginBottom: 22 }}>
          <video src={video.url} controls style={{ width: "100%", minHeight: 400, borderRadius: 9, background: "#111" }} />
        </div>
        <h2 style={{ margin: "9px 0" }}>{video.title}</h2>
        <div style={{ color: "#555", marginBottom: 10 }}>
          Uploaded by <b>{video.username}</b> • {new Date(video.uploadedAt).toLocaleString()}
        </div>
        <div style={{ margin: "12px 0", display: "flex", alignItems: "center", gap: 18 }}>
          <button onClick={handleLike} disabled={!user}
            style={{ background: liked ? "#FF0000" : "#eee", color: liked ? "#fff" : "#222", border: "none", borderRadius: 10, padding: "8px 22px", fontWeight: 500, cursor: "pointer" }}>
            👍 Like ({video.likes?.length || 0})
          </button>

          <button onClick={handleDislike} disabled={!user}
            style={{ background: disliked ? "#FF0000" : "#eee", color: disliked ? "#fff" : "#222", border: "none", borderRadius: 10, padding: "8px 22px", fontWeight: 500, cursor: "pointer" }}>
            👎 Dislike ({video.dislikes?.length || 0})
          </button>

          {!subscribed && user && video.userId !== user.id && (
            <button onClick={handleSubscribe} style={{ background: "#282828", color: "#fff", border: "none", borderRadius: 8, padding: "7px 20px", fontWeight: 600, cursor: "pointer" }}>
              Subscribe
            </button>
          )}
        </div>
        <div style={{ margin: "18px 0 34px 0", color: "#222", fontSize: 17 }}>
          {video.description}
        </div>

        <section>
          <h3>Comments ({comments.length})</h3>
          {user ? (
            <form onSubmit={handleComment} style={{ display: "flex", alignItems: "center", gap: 10, margin: "7px 0 18px 0" }}>
              <input
                value={comment}
                onChange={e => setComment(e.target.value)}
                style={{ flex: 1, padding: 8, borderRadius: 7, border: "1px solid #ddd" }}
                required
                minLength={2}
                maxLength={240}
                placeholder="Add a public comment"
              />
              <button type="submit" style={{ background: "#FF0000", color: "#fff", border: "none", borderRadius: 7, padding: "8px 16px", fontWeight: 500, cursor: "pointer" }}>
                Comment
              </button>
            </form>
          ) : (
            <div style={{ color: "#585858", margin: "7px 0" }}>
              <strong>
                <span style={{ color: "#FF0000", cursor: "pointer" }} onClick={() => nav("/login")}>Login</span>
              </strong> to comment.
            </div>
          )}
          <div>
            {comments.length === 0 ?
              <div style={{ color: "#888" }}>No comments yet.</div> :
              comments.slice().reverse().map((c) => (
                <div key={c.id}
                  style={{ borderBottom: "1px solid #eee", margin: "9px 0", paddingBottom: 8 }}>
                  <span style={{ fontWeight: "bold", color: "#1A1A1A" }}>{c.user}</span>{" "}
                  <span style={{ color: "#888", fontSize: 13, marginLeft: 8 }}>
                    {new Date(c.date).toLocaleString()}
                  </span>
                  <div style={{ marginTop: 4, fontSize: 15 }}>{c.comment}</div>
                </div>
              ))}
          </div>
        </section>
      </div>
      <aside style={{ flex: 1 }}>
        <h4>Recommended</h4>
        {recommendations.length === 0 ? (
          <div style={{ color: "#999", marginTop: 25 }}>No recommendations yet.</div>
        ) : (
          recommendations.map(v => (
            <div key={v.id} style={{ display: "flex", gap: 12, marginBottom: 18, cursor: "pointer" }} onClick={() => nav(`/video/${v.id}`)}>
              <div style={{ width: 100, height: 66, background: "#F2F2F2", borderRadius: 8 }}>
                <video src={v.url} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} controls={false} preload="metadata" muted />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: "#282828" }}>{v.title}</div>
                <div style={{ color: "#777", fontSize: 14 }}>{v.username}</div>
              </div>
            </div>
          ))
        )}
      </aside>
    </div>
  );
}

export default VideoPlayerPage;
