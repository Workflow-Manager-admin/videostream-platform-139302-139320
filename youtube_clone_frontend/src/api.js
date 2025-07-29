//
// PUBLIC_INTERFACE
// All API calls to backend (replace endpoint URLs as needed)
// For demo: simulates API responses with local storage

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

// PUBLIC_INTERFACE
export async function login(email, password) {
  // Replace with real API call
  // const res = await fetch(`${baseUrl}/login`, {method: 'POST', body: JSON.stringify({email, password})})
  // return await res.json()
  const user = { email, id: "1", username: "DemoUser", subscriptions: [] };
  window.localStorage.setItem("user", JSON.stringify(user));
  return user;
}

// PUBLIC_INTERFACE
export async function register(email, password, username) {
  // Replace with real registration logic
  const user = { email, username, id: String(Math.floor(Math.random()*10000)), subscriptions: []};
  window.localStorage.setItem("user", JSON.stringify(user));
  return user;
}

// PUBLIC_INTERFACE
export function getLoggedInUser() {
  const user = window.localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// PUBLIC_INTERFACE
export function logout() {
  window.localStorage.removeItem("user");
}

// PUBLIC_INTERFACE
export function uploadVideo({title, description, file, userId}) {
  // Save minimal video metadata to localstorage for demo
  return new Promise((resolve) => {
    setTimeout(() => {
      const videos = JSON.parse(window.localStorage.getItem("videos") || "[]");
      const newVideo = {
        id: String(Date.now()),
        title,
        description,
        url: URL.createObjectURL(file),
        userId,
        username: "DemoUser",
        likes: [],
        dislikes: [],
        comments: [],
        uploadedAt: new Date().toISOString(),
      };
      window.localStorage.setItem("videos", JSON.stringify([newVideo, ...videos]));
      resolve(newVideo);
    }, 800);
  });
}

// PUBLIC_INTERFACE
export function listVideos(search = "") {
  // In demo, get all from local storage
  let videos = JSON.parse(window.localStorage.getItem("videos") || "[]");
  if (search) {
    const q = search.toLowerCase();
    videos = videos.filter(
      v =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
    );
  }
  return videos;
}

// PUBLIC_INTERFACE
export function getVideoById(videoId) {
  const videos = JSON.parse(window.localStorage.getItem("videos") || "[]");
  return videos.find(v => v.id === videoId);
}

// PUBLIC_INTERFACE
export function addComment(videoId, comment, user) {
  const videos = JSON.parse(window.localStorage.getItem("videos") || "[]");
  const index = videos.findIndex(v => v.id === videoId);
  if (index >= 0) {
    videos[index].comments = videos[index].comments || [];
    videos[index].comments.push({
      id: String(Date.now()),
      user,
      comment,
      date: new Date().toISOString(),
    });
    window.localStorage.setItem("videos", JSON.stringify(videos));
  }
  return videos[index].comments;
}

// PUBLIC_INTERFACE
export function getComments(videoId) {
  const video = getVideoById(videoId);
  return video && video.comments ? video.comments : [];
}

// PUBLIC_INTERFACE
export function likeVideo(videoId, userId) {
  updateLikes(videoId, userId, true);
}
export function dislikeVideo(videoId, userId) {
  updateLikes(videoId, userId, false);
}
function updateLikes(videoId, userId, isLike) {
  const videos = JSON.parse(window.localStorage.getItem("videos") || "[]");
  const index = videos.findIndex(v => v.id === videoId);
  if (index >= 0) {
    const vid = videos[index];
    vid.likes = vid.likes || [];
    vid.dislikes = vid.dislikes || [];
    if (isLike) {
      if (!vid.likes.includes(userId)) vid.likes.push(userId);
      vid.dislikes = vid.dislikes.filter(id => id !== userId);
    } else {
      if (!vid.dislikes.includes(userId)) vid.dislikes.push(userId);
      vid.likes = vid.likes.filter(id => id !== userId);
    }
    videos[index] = vid;
    window.localStorage.setItem("videos", JSON.stringify(videos));
  }
}

// PUBLIC_INTERFACE
export function subscribeToUser(targetUserId, userId) {
  // Update user "subscriptions"
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (!user.subscriptions) user.subscriptions = [];
  if (!user.subscriptions.includes(targetUserId)) user.subscriptions.push(targetUserId);
  window.localStorage.setItem("user", JSON.stringify(user));
  return user.subscriptions;
}

// PUBLIC_INTERFACE
export function getRecommendations(currentVideoId) {
  // For demo: return all other videos
  const videos = JSON.parse(window.localStorage.getItem("videos") || "[]");
  return videos.filter(v => v.id !== currentVideoId).slice(0, 5);
}

