// ===== Helpers =====
const $ = (id) => document.getElementById(id);

// ===== State =====
let CURRENT_WEEK = 1; // 1..4

// ===== Tabs (existing IDs from your template) =====
const tabs = {
  today: $("tab-today"),
  week: $("tab-week"),
  month: $("tab-month"),   // if exists in your HTML
  shop: $("tab-shop"),
};

// ===== Views (existing IDs from your template) =====
const views = {
  today: $("view-today"),
  week: $("view-week"),
  month: $("view-month"), // if exists in your HTML
  shop: $("view-shop"),
};

function setActiveTab(which) {
  Object.entries(views).forEach(([k, el]) => {
    if (!el) return;
    el.classList.toggle("hidden", k !== which);
  });

  Object.entries(tabs).forEach(([k, el]) => {
    if (!el) return;
    el.classList.toggle("active", k === which);
  });
}

// ===== Wire buttons =====
tabs.today && (tabs.today.onclick = () => {
  setActiveTab("today");
  renderToday();
});
tabs.week && (tabs.week.onclick = () => {
  setActiveTab("week");
  renderWeek();
});
tabs.month && (tabs.month.onclick = () => {
  setActiveTab("month");
  renderMonth();
});
tabs.shop && (tabs.shop.onclick = () => {
  setActiveTab("shop");
  renderShopping();
});

// ===== Inject Randomize button into header (top-right) =====
(function injectRandomizeBtn() {
  const nav = document.querySelector(".nav");
  if (!nav || document.getElementById("tab-randomize")) return;

  const btn = document.createElement("button");
  btn.className = "tab";
  btn.id = "tab-randomize";
  btn.textContent = "🎲 Randomize";
  btn.onclick = () => {
    CURRENT_WEEK = CURRENT_WEEK % 4 + 1; // 1→2→3→4→1
    renderWeek();
    renderToday();
  };

  nav.prepend(btn); // put Randomize first (as requested)
})();

// ===== Data helpers (from data.js) =====
function mealsForWeek(week) {
  return (window.MEAL_DATA || []).filter((m) => m.week === week);
}

function todayKey() {
  const map = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return map[new Date().getDay()];
}

// ===== Card renderer (keeps original card styles) =====
function renderMealCard(typeLabel, mealName, kidsMeal) {
  const ingredients = (window.INGREDIENTS && window.INGREDIENTS[mealName]) || [];
  const kcal = (window.CALORIES && window.CALORIES[mealName]) || 0;

  return `
    <div class="card">
      <div class="imgWrap">
        <!-- IMAGE PLACEHOLDER: replace URL later -->
        <img
          class="mealImg"
          src="https://images.unsplash.com/photo-1604908177453-7462950a6b94?auto=format&fit=crop&w=1200&q=80"
          alt="${mealName || "Meal"}"
          loading="lazy"
          onerror="this.style.display='none';"
        />
        <span class="kcal">${kcal} kcal</span>
      </div>

      <div class="cardTop">
        <div>
          <div class="mealType">${typeLabel}</div>
          <div class="mealName">${mealName || "—"}</div>
        </div>
      </div>

      <details>
        <summary>Ingredients</summary>
        <ul>
          ${ingredients.length ? ingredients.map(i => `<li>${i}</li>`).join("") : "<li>Add ingredients</li>"}
        </ul>
      </details>

      ${
        kidsMeal
          ? `
        <details>
          <summary>Kids Menu</summary>
          <div>${kidsMeal}</div>
        </details>
      `
          : ""
      }
    </div>
  `;
}

// ===== Render Today (defaults to today's weekday) =====
function renderToday() {
  const wrap = $("todayCards");
  if (!wrap) return;

  const rows = mealsForWeek(CURRENT_WEEK);
  const todayRow = rows.find((r) => r.day === todayKey()) || rows[0];

  if (!todayRow) {
    wrap.innerHTML = `<div class="hint">No meals found for this week.</div>`;
    return;
  }

  wrap.innerHTML = `
    ${renderMealCard("Breakfast", todayRow.breakfast)}
    ${renderMealCard("Lunch", todayRow.lunch, todayRow.kidsLunch)}
    ${renderMealCard("Dinner", todayRow.dinner)}
  `;
}

// ===== Render Week (defaults to today's day highlighted by template) =====
function renderWeek() {
  const wrap = $("weekCards");
  if (!wrap) return;

  const rows = mealsForWeek(CURRENT_WEEK);
  if (!rows.length) {
    wrap.innerHTML = `<div class="hint">No meals found for this week.</div>`;
    return;
  }

  wrap.innerHTML = "";
  rows.forEach((r) => {
    wrap.innerHTML += `
      <h3>${r.day}</h3>
      ${renderMealCard("Breakfast", r.breakfast)}
      ${renderMealCard("Lunch", r.lunch, r.kidsLunch)}
      ${renderMealCard("Dinner", r.dinner)}
    `;
  });
}

// ===== Render Month (small tiles overview) =====
function renderMonth() {
  const wrap = $("view-month");
  if (!wrap) return;

  let html = `<h2>Month</h2><div class="monthGrid">`;
  for (let w = 1; w <= 4; w++) {
    html += `<div class="monthTile" onclick="window.__setWeek(${w})">Week ${w}</div>`;
  }
  html += `</div>`;

  wrap.innerHTML = html;
}

// helper to switch week from month tiles
window.__setWeek = function (w) {
  CURRENT_WEEK = w;
  setActiveTab("week");
  renderWeek();
};

// ===== Render Shopping List (table format, monthly) =====
function renderShopping() {
  const wrap = $("shopList");
  if (!wrap) return;

  // Collect meals for all 4 weeks
  const allMeals = (window.MEAL_DATA || []);
  const items = new Map();

  allMeals.forEach((m) => {
    [m.breakfast, m.lunch, m.dinner].forEach((meal) => {
      const ing = (window.INGREDIENTS && window.INGREDIENTS[meal]) || [];
      ing.forEach((i) => items.set(i, (items.get(i) || 0) + 1));
    });
  });

  // Must-haves
  ["Eggs", "Milk", "Bread"].forEach((x) => items.set(x, (items.get(x) || 0) + 1));

  let rows = "";
  items.forEach((qty, name) => {
    const store = /milk|bread|eggs/i.test(name) ? "Walmart" : "Superstore";
    rows += `<tr><td>${name}</td><td>${qty}</td><td>${store}</td></tr>`;
  });

  wrap.innerHTML = `
    <table class="shop-table">
      <thead>
        <tr><th>Item</th><th>Qty</th><th>Store</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// ===== Init =====
(function init() {
  setActiveTab("today");
  renderToday();
  renderWeek();
})();
