// === SHARED HELPERS ===

function formatPrice(price) {
  if (!price && price !== 0) return "";
  return "₦" + Number(price).toLocaleString();
}

function timeAgo(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "yanzu";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + "m";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h";
  const days = Math.floor(hours / 24);
  return days + "d";
}

// Redirect to login if not authenticated (use on protected pages)
function requireAuth(callback) {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "/pages/login.html";
    } else {
      callback(user);
    }
  });
}

// Get current user without redirecting
function getCurrentUser(callback) {
  auth.onAuthStateChanged(user => callback(user));
}

function createListingCard(listing) {
  const card = document.createElement("div");
  card.className = "listing-card";
  card.style.position = "relative";
  card.onclick = () => {
    window.location.href = "pages/listing-detail.html?id=" + listing.id;
  };

  const img = listing.images && listing.images.length > 0
    ? listing.images[0]
    : "https://placehold.co/300x220?text=LBB+Connect";

  card.innerHTML = `
    ${listing.featured ? '<span class="featured-badge">FEATURED</span>' : ''}
    <img src="${img}" alt="${listing.title}">
    <div class="info">
      <div class="title">${listing.title}</div>
      ${listing.price ? `<div class="price">${formatPrice(listing.price)}</div>` : ''}
      <div class="location">${listing.location?.city || ''}, ${listing.location?.state || ''}</div>
    </div>
  `;
  return card;
}
