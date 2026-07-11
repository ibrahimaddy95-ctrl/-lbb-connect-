// === HOME SCREEN LOGIC ===

let currentType = "all";
let allListings = [];

async function loadListings() {
  const grid = document.getElementById("listingsGrid");
  const emptyState = document.getElementById("emptyState");
  grid.innerHTML = "<p style='padding:20px;color:#6b7280;'>Ana lodi...</p>";

  try {
    let query = db.collection("listings")
      .where("status", "==", "active")
      .orderBy("createdAt", "desc")
      .limit(30);

    const snapshot = await query.get();
    allListings = [];
    snapshot.forEach(doc => {
      allListings.push({ id: doc.id, ...doc.data() });
    });

    renderListings();
  } catch (err) {
    console.error("Error loading listings:", err);
    grid.innerHTML = "<p style='padding:20px;color:#e53935;'>An samu matsala wajen lodin listings.</p>";
  }
}

function renderListings() {
  const grid = document.getElementById("listingsGrid");
  const emptyState = document.getElementById("emptyState");
  grid.innerHTML = "";

  const filtered = currentType === "all"
    ? allListings
    : allListings.filter(l => l.type === currentType);

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  filtered.forEach(listing => {
    grid.appendChild(createListingCard(listing));
  });
}

// Category chip clicks
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    currentType = chip.dataset.type;
    renderListings();
  });
});

// Search
document.getElementById("searchInput").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const grid = document.getElementById("listingsGrid");
  grid.innerHTML = "";

  const filtered = allListings.filter(l =>
    l.title.toLowerCase().includes(term) &&
    (currentType === "all" || l.type === currentType)
  );

  filtered.forEach(listing => grid.appendChild(createListingCard(listing)));
});

loadListings();
