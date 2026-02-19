<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>

// ===== Helpers =====
const $ = (id) => document.getElementById(id);

// ===== Excel Loader =====
let EXCEL_ROWS = [];

async function loadExcelMeals() {
  const res = await fetch("Monthly_Meal_Plan.xlsx");
  const buffer = await res.arrayBuffer();
  const wb = XLSX.read(buffer, { type: "array" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  EXCEL_ROWS = XLSX.utils.sheet_to_json(sheet);
}

// ===== State =====
let CURRENT_WEEK_INDEX = 0; // 0..3

function cycleWeek() {
  CURRENT_WEEK_INDEX = (CURRENT_WEEK_INDEX + 1) % 4;
  renderWeek();
}

// ===== Wire header buttons (existing IDs) =====
const tabs = {
  today: $("tab-today"),
  week: $("tab-week"),
  shop: $("tab-shop"),
};

function setActiveTab(which) {
  $("view-today").classList.toggle("hidden", which !== "today");
  $("view-week").classList.toggle("hidden", which !== "week");
  $("view-shop").classList.toggle("hidden", which !== "shop");

  Object.entries(tabs).forEach(([k, el]) => el.classList.toggle("active", k === which));
}

tabs.today.onclick = () => setActiveTab("today");
tabs.week.onclick = () => setActiveTab("week");
tabs.shop.onclick = () => setActiveTab("shop");

// ===== Add Randomize to header safely =====
(function injectRandomizeBtn() {
  const nav = document.querySelector(".nav");
  if (!nav || document.getElementById("tab-randomize")) return;

  const btn = document.createElement("button");
  btn.className = "tab";
  btn.id = "tab-randomize";
  btn.textContent = "🎲 Randomize";
  btn.onclick = cycleWeek;

  nav.prepend(btn);
})();

// ===== Render Cards (reuses original styles) =====
function renderMealCard(typeLabel, title, kcal, ingredients, kidsMenu) {
  const ingHtml = (ingredients || []).map((i) => `<li>${i}</li>`).join("");

  return `
    <div class="card">
      <div class="imgWrap">
        <!-- IMAGE PLACEHOLDER: replace URL later -->
        <img class="mealImg" src="https://images.unsplash.com/photo-1604908177453-7462950a6b94?auto=format&fit=crop&w=1200&q=80" />
        <span class="kcal">${kcal || 0} kcal</span>
      </div>

      <div class="cardTop">
        <div>
          <div class="mealType">${typeLabel}</div>
          <div class="mealName">${title || "—"}</div>
        </div>
      </div>

      <div class="details">
        <h3>Ingredients</h3>
        <ul>${ingHtml || "<li>Add ingredients</li>"}</ul>
        ${kidsMenu ? `<h3>Kids Menu</h3><div>${kidsMenu}</div>` : ""}
      </div>
    </div>
  `;
}

// ===== Render Week (from Excel) =====
function renderWeek() {
  const wrap = $("weekCards");
  wrap.innerHTML = "";

  const weekRows = EXCEL_ROWS.slice(CURRENT_WEEK_INDEX * 7, CURRENT_WEEK_INDEX * 7 + 7);

  weekRows.forEach((r) => {
    wrap.innerHTML += `
      ${renderMealCard("Breakfast", r["Breakfast (Family)"], 450, ["Eggs", "Bread", "Milk"])}
      ${renderMealCard("Lunch", r["Lunch (Adults)"], 650, ["Rice", "Chicken"], r["Kids Lunch (School)"])}
      ${renderMealCard("Dinner", r["Dinner (Family)"], 800, ["Egusi", "Palm oil", "Onions"])}
    `;
  });
}

// ===== Render Today (default to today's weekday) =====
function renderToday() {
  const idx = new Date().getDay(); // Sun=0
  const mondayFirst = (idx + 6) % 7;

  const weekRows = EXCEL_ROWS.slice(CURRENT_WEEK_INDEX * 7, CURRENT_WEEK_INDEX * 7 + 7);
  const today = weekRows[mondayFirst];

  const wrap = $("todayCards");
  wrap.innerHTML = `
    ${renderMealCard("Breakfast", today["Breakfast (Family)"], 450, ["Eggs", "Bread", "Milk"])}
    ${renderMealCard("Lunch", today["Lunch (Adults)"], 650, ["Rice", "Chicken"], today["Kids Lunch (School)"])}
    ${renderMealCard("Dinner", today["Dinner (Family)"], 800, ["Egusi", "Palm oil", "Onions"])}
  `;
}

// ===== Init =====
(async function init() {
  await loadExcelMeals();
  renderToday();
  renderWeek();
  setActiveTab("today");
})();
