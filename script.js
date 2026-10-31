const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Mobile navigation
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Theme switch, remembered for this browser session
$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  $("#themeToggle").textContent = document.body.classList.contains("light") ? "☾" : "☼";
});

// Scroll progress
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $("#progress").style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
});

// Reveal sections as they enter view
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => observer.observe(el));

// Before/after image comparison slider
const range = $("#compareRange");
const clip = $("#afterClip");
const line = $("#compareLine");
const stage = $("#comparisonStage");
function updateComparison() {
  const value = Number(range.value);
  clip.style.width = value + "%";
  line.style.left = value + "%";
  const afterImage = clip.querySelector("img");
  afterImage.style.width = stage.clientWidth + "px";
}
range.addEventListener("input", updateComparison);
window.addEventListener("resize", updateComparison);
updateComparison();

// Small toast feedback
let toastTimer;
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

// Package buttons copy a ready-to-send inquiry
$$(".select-plan").forEach(button => {
  button.addEventListener("click", async () => {
    const message = `Hi Sanskriti, I'm interested in ${button.dataset.plan}. Could you share the next steps?`;
    try {
      await navigator.clipboard.writeText(message);
      toast("Package inquiry copied. Paste it into your LinkedIn message.");
    } catch {
      toast("Please message Sanskriti on LinkedIn about: " + button.dataset.plan);
    }
  });
});

$("#copyMessage").addEventListener("click", async () => {
  const message = "Hi Sanskriti, I'd like to discuss LinkedIn branding and content support. Could we connect to discuss my goals?";
  try {
    await navigator.clipboard.writeText(message);
    toast("Inquiry message copied. Paste it into your LinkedIn message.");
  } catch {
    toast("Connect with Sanskriti through the LinkedIn button.");
  }
});

$("#year").textContent = new Date().getFullYear();
