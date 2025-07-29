import React from "react";
import { getLoggedInUser } from "../api";

// PUBLIC_INTERFACE
function ProfilePage() {
  const user = getLoggedInUser();

  return (
    <div style={{ maxWidth: 420, margin: "42px auto", background: "#fff", padding: 36, borderRadius: 16, boxShadow: "0 11px 34px #ececec" }}>
      <h2 style={{ marginBottom: 26 }}>Profile</h2>
      <div style={{ fontSize: 16, lineHeight: 1.8 }}>
        <div>
          <b>Username:</b> {user.username}
        </div>
        <div>
          <b>Email:</b> {user.email}
        </div>
        <div>
          <b>Subscriptions:</b>
          <ul>
            {(user.subscriptions || []).length === 0 ? (
              <li style={{ color: "#888" }}>None</li>
            ) : (
              user.subscriptions.map((sid, i) => <li key={sid}>{sid}</li>)
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
