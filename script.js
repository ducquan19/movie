// --- CONFIG ---
const YOUTUBE_ID = "8RYLIN8GuEc"; // <-- Thay bằng ID YouTube của phim/trailer
const POSTER_SRC = "./assets/poster.jpg";
const GROUP_IMG = "./assets/group.jpg";

// Init elements
const btnSummary = document.getElementById("btn-summary");
const modalSummary = document.getElementById("modalSummary");
const btnWatch = document.getElementById("btn-watch");
const ytFrame = document.getElementById("ytFrame");
const posterImg = document.getElementById("posterImg");
const navHome = document.getElementById("nav-home");
const navAbout = document.getElementById("nav-about");
const homeSection = document.getElementById("home");
const aboutSection = document.getElementById("about");

// Apply initial sources
ytFrame.src = `https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0`;
btnWatch.href = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;

// Modal helper
function openModal(modal) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Summary modal
btnSummary.addEventListener("click", () => openModal(modalSummary));
modalSummary
  .querySelectorAll("[data-close]")
  .forEach((el) =>
    el.addEventListener("click", () => closeModal(modalSummary))
  );

// Member modal behaviors
const members = document.querySelectorAll(".member");
const modalMember = document.getElementById("modalMember");
const memberImg = document.getElementById("memberImg");
const memberName = document.getElementById("memberName");
const memberId = document.getElementById("memberId");
const memberEmail = document.getElementById("memberEmail");

members.forEach((m) => {
  m.style.cursor = "pointer";
  m.addEventListener("click", () => {
    const name = m.dataset.name;
    const id = m.dataset.id;
    const email = m.dataset.email;
    const img = m.dataset.img;
    memberImg.src = img;
    memberName.textContent = name;
    memberId.textContent = "MSSV: " + id;
    memberEmail.textContent = "Email: " + email;
    openModal(modalMember);
  });
});
modalMember
  .querySelectorAll("[data-close]")
  .forEach((el) => el.addEventListener("click", () => closeModal(modalMember)));

// Show / hide sections
function showHome() {
  // show home (grid) and hide about
  homeSection.style.display = "";
  aboutSection.style.display = "none";
  navHome.classList.add("active");
  navAbout.classList.remove("active");
  // make sure focus for accessibility
  navHome.focus();
}

function showAbout() {
  // hide home and show about (block)
  homeSection.style.display = "none";
  aboutSection.style.display = "";
  navAbout.classList.add("active");
  navHome.classList.remove("active");
  navAbout.focus();
}

// Navigation: replace previous smooth scroll behavior with explicit show/hide
navHome.addEventListener("click", (e) => {
  e.preventDefault();
  showHome();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navAbout.addEventListener("click", (e) => {
  e.preventDefault();
  showAbout();
  // scroll to top of about section
  aboutSection.scrollIntoView({ behavior: "smooth" });
});

// Initialize view: show home, hide about
showHome();

// Keyboard: ESC to close open modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.open").forEach((m) => closeModal(m));
  }
});

// Small UX: pause iframe when modal open by removing src, then restore when closed
// store current src
const originalSrc = ytFrame.src;
function pauseVideo() {
  try {
    ytFrame.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  } catch (e) {}
}

// If you want the iframe to stop when About is opened, uncomment below:
navAbout.addEventListener("click", pauseVideo);

// OPTIONAL: You can call a function to update summary text dynamically
function setSummary(text) {
  document.getElementById("summaryText").textContent = text;
}
