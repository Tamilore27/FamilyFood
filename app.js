const $ = (id) => document.getElementById(id);

// ===== Active week index (0-3, cycles) =====
let ACTIVE_WEEK_IDX = parseInt(localStorage.getItem("activeWeekIdx") || "0", 10) % 4;

function getActiveWeek() { return FOUR_WEEK_PLAN[ACTIVE_WEEK_IDX]; }

// ===== Views & Tabs =====
const VIEW_IDS = ["today", "week", "month", "shop"];

function setActiveTab(which) {
  VIEW_IDS.forEach((v) => {
    const el = $("view-" + v);
    if (el) el.classList.toggle("hidden", v !== which);
  });
  ["today","week","month","shop"].forEach((k) => {
    const t = $("tab-" + k);
    if (t) t.classList.toggle("active", k === which);
  });
  $("weekDropdown").classList.remove("open");
}

$("tab-today").onclick = () => { setActiveTab("today"); renderToday(); };
$("tab-week").onclick  = () => { setActiveTab("week");  renderWeek(); };
$("tab-shop").onclick  = () => { setActiveTab("shop");  renderShopping(); };

$("tab-month").onclick = (e) => {
  e.stopPropagation();
  const dd = $("weekDropdown");
  const isOpen = dd.classList.toggle("open");
  if (isOpen) {
    setActiveTab("month");
    renderMonth(ACTIVE_WEEK_IDX);
  }
};

document.querySelectorAll(".weekTile").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const wi = parseInt(btn.dataset.week, 10);
    ACTIVE_WEEK_IDX = wi;
    localStorage.setItem("activeWeekIdx", wi);
    $("weekDropdown").classList.remove("open");
    setActiveTab("month");
    renderMonth(wi);
    renderToday();
    renderWeek();
  });
});

document.addEventListener("click", () => $("weekDropdown").classList.remove("open"));

// Randomize → advance to next week
$("tab-rand").onclick = () => {
  ACTIVE_WEEK_IDX = (ACTIVE_WEEK_IDX + 1) % 4;
  localStorage.setItem("activeWeekIdx", ACTIVE_WEEK_IDX);
  renderToday();
  renderWeek();
  renderShopping();
  if (!$("view-month").classList.contains("hidden")) renderMonth(ACTIVE_WEEK_IDX);
  // flash confirm
  const btn = $("tab-rand");
  btn.textContent = "✓ " + getActiveWeek().weekLabel;
  setTimeout(() => { btn.textContent = "🎲 Randomize"; }, 2000);
};

$("printBtn").onclick = () => window.print();

// ===== Date helpers =====
function weekdayIdxMon(date = new Date()) { return (date.getDay() + 6) % 7; }
function formatDateLong(d) {
  return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric", year: "numeric" });
}

// ===== Dropdown helper =====
function makeDropBtn(label, items, extraClass) {
  const wrap = document.createElement("div");
  wrap.className = "dropWrap" + (extraClass ? " " + extraClass : "");

  const btn = document.createElement("button");
  btn.className = "tag tagDrop";
  btn.innerHTML = label + ' <span class="dropArrow">▾</span>';

  const panel = document.createElement("div");
  panel.className = "dropPanel";
  panel.innerHTML = items.length
    ? items.map(i => `<div class="dropItem">${escapeHtml(String(i))}</div>`).join("")
    : `<div class="dropItem muted">—</div>`;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".dropPanel.open").forEach(p => { if (p !== panel) p.classList.remove("open"); });
    panel.classList.toggle("open");
  });
  wrap.appendChild(btn);
  wrap.appendChild(panel);
  return wrap;
}

document.addEventListener("click", () => {
  document.querySelectorAll(".dropPanel.open").forEach(p => p.classList.remove("open"));
});

// ===== Card builder — VERTICAL STACK style =====
function renderMealCard(typeLabel, m, mealType) {
  const ingItems = (m.ingredients || []).map(x => `${x.name} — ${prettyQty(x.qty)} ${x.unit}`);
  const steps = (m.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join("");

  const card = document.createElement("div");
  card.className = "card";

  // Image — left panel
  const imgDiv = document.createElement("div");
  imgDiv.className = "cardImg";
  if (m.image) {
    const img = document.createElement("img");
    img.className = "mealImg";
    img.src = m.image;
    img.alt = m.title || "Meal";
    img.loading = "lazy";
    img.onerror = () => { imgDiv.classList.add("imgError"); img.style.display = "none"; };
    imgDiv.appendChild(img);
  } else {
    imgDiv.classList.add("imgPlaceholder");
  }

  // Content — right panel
  const content = document.createElement("div");
  content.className = "cardContent";

  // Top row: type label + kcal
  const topRow = document.createElement("div");
  topRow.className = "cardTopRow";
  topRow.innerHTML = `
    <div>
      <div class="mealType">${escapeHtml(typeLabel)}</div>
      <div class="mealName">${escapeHtml(m.title || "")}</div>
      <div class="mealCuisine">${escapeHtml(m.cuisine || "")}</div>
    </div>
    <div class="kcal">${Number(m.kcalPerServing || 0)} kcal</div>
  `;
  content.appendChild(topRow);

  // Tags row with dropdowns
  const tagsRow = document.createElement("div");
  tagsRow.className = "tagsRow";
  tagsRow.appendChild(makeDropBtn("🧂 Ingredients", ingItems));
  if (mealType === "lunch") {
    const km = m.kidsMenu;
    const kidsItems = km ? [`${km.title}`, `~${km.kcal} kcal`] : ["No kids menu listed"];
    tagsRow.appendChild(makeDropBtn("👦 Kids Menu", kidsItems, "kidsDropWrap"));
  }
  content.appendChild(tagsRow);

  // Expandable recipe steps
  const details = document.createElement("div");
  details.className = "cardDetails";
  details.innerHTML = `<h3>Recipe Steps</h3><ol>${steps}</ol>`;
  content.appendChild(details);

  // Toggle expand on click (but not on dropdown)
  card.appendChild(imgDiv);
  card.appendChild(content);

  card.addEventListener("click", (e) => {
    if (e.target.closest(".dropWrap")) return;
    card.classList.toggle("expanded");
  });

  return card;
}

// ===== Render Today =====
function renderToday() {
  const week = getActiveWeek();
  const idx = weekdayIdxMon(new Date());
  const day = week.days[idx];

  $("todayTitle").textContent = "Today";
  $("todayPill").textContent = `${day.name} • ${formatDateLong(new Date())}`;
  $("weekBadge").textContent = week.weekLabel;

  const wrap = $("todayCards");
  wrap.innerHTML = "";
  wrap.appendChild(renderMealCard("Breakfast", day.breakfast, "breakfast"));
  wrap.appendChild(renderMealCard("Lunch",     day.lunch,    "lunch"));
  wrap.appendChild(renderMealCard("Dinner",    day.dinner,   "dinner"));
}

// ===== Render Week =====
function renderWeek() {
  const week = getActiveWeek();
  $("weekTitle").textContent = "Week Plan";
  $("weekBadge2").textContent = week.weekLabel;
  $("weekPill").textContent = "Mon → Sun";

  const tabsWrap = $("dayTabs");
  const cardsWrap = $("weekCards");
  tabsWrap.innerHTML = "";

  let activeIdx = weekdayIdxMon(new Date());

  week.days.forEach((d, i) => {
    const b = document.createElement("button");
    b.className = "dayTab" + (i === activeIdx ? " active" : "");
    b.textContent = d.name.slice(0, 3);
    b.onclick = () => {
      activeIdx = i;
      [...tabsWrap.children].forEach((x, j) => x.classList.toggle("active", j === i));
      showDay(i);
    };
    tabsWrap.appendChild(b);
  });

  function showDay(i) {
    const day = week.days[i];
    cardsWrap.innerHTML = "";
    cardsWrap.appendChild(renderMealCard(`${day.name} • Breakfast`, day.breakfast, "breakfast"));
    cardsWrap.appendChild(renderMealCard(`${day.name} • Lunch`,     day.lunch,    "lunch"));
    cardsWrap.appendChild(renderMealCard(`${day.name} • Dinner`,    day.dinner,   "dinner"));
  }

  showDay(activeIdx);
}

// ===== Render Month =====
function renderMonth(highlightWeek) {
  const grid = $("monthGrid");
  grid.innerHTML = "";

  FOUR_WEEK_PLAN.forEach((week, wi) => {
    const weekBlock = document.createElement("div");
    weekBlock.className = "monthWeek" + (wi === highlightWeek ? " monthWeekActive" : "");

    const header = document.createElement("div");
    header.className = "monthWeekHeader";
    header.textContent = week.weekLabel;
    weekBlock.appendChild(header);

    const daysGrid = document.createElement("div");
    daysGrid.className = "monthDaysGrid";

    week.days.forEach((day) => {
      const tile = document.createElement("div");
      tile.className = "monthDayTile";
      tile.innerHTML = `
        <div class="monthDayName">${day.name.slice(0,3)}</div>
        <div class="monthMealRow"><span class="mTypeLabel">B</span><span class="mTitle">${escapeHtml(day.breakfast.title)}</span></div>
        <div class="monthMealRow"><span class="mTypeLabel lunch">L</span><span class="mTitle">${escapeHtml(day.lunch.title)}</span></div>
        <div class="monthMealRow"><span class="mTypeLabel dinner">D</span><span class="mTitle">${escapeHtml(day.dinner.title)}</span></div>
      `;
      tile.addEventListener("click", () => {
        ACTIVE_WEEK_IDX = wi;
        localStorage.setItem("activeWeekIdx", wi);
        setActiveTab("week");
        renderWeek();
      });
      daysGrid.appendChild(tile);
    });

    weekBlock.appendChild(daysGrid);
    grid.appendChild(weekBlock);
  });
}

// ===== Shopping =====
function toBaseUnit(qty, unit) {
  const u = String(unit || "").toLowerCase();
  if (u === "kg") return { qty: qty * 1000, unit: "g" };
  if (u === "g")  return { qty, unit: "g" };
  if (u === "l")  return { qty: qty * 1000, unit: "ml" };
  if (u === "ml") return { qty, unit: "ml" };
  return { qty, unit: "pcs" };
}
function fromBaseUnit(qty, unit) {
  if (unit === "g"  && qty >= 1000) return { qty: qty / 1000, unit: "kg" };
  if (unit === "ml" && qty >= 1000) return { qty: qty / 1000, unit: "L" };
  return { qty, unit };
}
function buildTotals(weekPlan) {
  const totals = new Map();
  weekPlan.days.forEach((d) => {
    [d.breakfast, d.lunch, d.dinner].forEach((m) => {
      (m.ingredients || []).forEach((x) => {
        const base = toBaseUnit(x.qty, x.unit);
        const prev = totals.get(x.name);
        totals.set(x.name, prev
          ? { qty: prev.qty + base.qty, unit: prev.unit }
          : { qty: base.qty, unit: base.unit });
      });
    });
  });
  return totals;
}
function estimateCost(name, totalBase) {
  const pb = PRICE_BOOK[name];
  if (!pb) return { known: false, cost: 0, store: "Unknown", packs: 0, packPrice: 0 };
  const packBase = toBaseUnit(pb.packSize, pb.unit);
  const packs = packBase.qty > 0 ? Math.ceil(totalBase.qty / packBase.qty) : 0;
  return { known: true, cost: packs * pb.price, store: pb.store, packs, packPrice: pb.price };
}
function inferCat(name) {
  const pb = PRICE_BOOK[name];
  if (pb?.category) return pb.category;
  const n = name.toLowerCase();
  if (/chicken|beef|salmon|tuna|fish|shrimp|sausage/.test(n)) return "Meat/Fish";
  if (/milk|cheese|yogurt|eggs|butter/.test(n)) return "Dairy";
  if (/rice|oats|pasta|flour|beans|egusi|oil|cereal|bread/.test(n)) return "Pantry";
  if (/onion|tomato|pepper|banana|berr|apple|carrot|lettuce|cucumber|potato|plantain|yam|vegetable/.test(n)) return "Produce";
  return "Other";
}
function prettyQty(q) {
  if (Number.isInteger(q)) return String(q);
  return String(Math.round(q * 100) / 100);
}

function renderShopping() {
  const weekIdx = parseInt($("weekFilter").value, 10);
  const weekPlan = FOUR_WEEK_PLAN[weekIdx];
  const totals = buildTotals(weekPlan);
  const storeFilter = $("storeFilter").value;
  const groupBy = $("groupBy").value;

  const rows = [];
  totals.forEach((base, name) => {
    const shown = fromBaseUnit(base.qty, base.unit);
    const cost = estimateCost(name, base);
    rows.push({ name, qty: shown.qty, unit: shown.unit, category: inferCat(name),
      store: cost.known ? cost.store : "Unknown",
      costKnown: cost.known, cost: cost.cost, packs: cost.packs, packPrice: cost.packPrice });
  });

  const filtered = rows.filter(r => storeFilter === "ALL" || r.store === storeFilter);
  const totalCost = filtered.reduce((s, r) => s + (r.costKnown ? r.cost : 0), 0);
  const unknownCount = filtered.filter(r => !r.costKnown).length;

  $("budgetPill").textContent = `Est: $${totalCost.toFixed(2)}` + (unknownCount ? ` • ${unknownCount} need price` : "");

  const storeTotals = {};
  filtered.forEach(r => { if (r.costKnown) storeTotals[r.store] = (storeTotals[r.store] || 0) + r.cost; });

  $("shopSummary").innerHTML = `
    <div><strong>${weekPlan.weekLabel}</strong> — full week ingredient totals, rounded up to pack sizes.</div>
    <div class="small" style="margin-top:8px;">
      ${Object.keys(storeTotals).length
        ? Object.entries(storeTotals).map(([k,v]) => `${escapeHtml(k)}: <strong>$${v.toFixed(2)}</strong>`).join(" • ")
        : "Edit PRICE_BOOK in data.js for better totals."}
    </div>`;

  const groups = new Map();
  filtered.sort((a,b)=>a.name.localeCompare(b.name)).forEach(r => {
    const key = groupBy === "store" ? r.store : r.category;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  });

  const listWrap = $("shopList");
  listWrap.innerHTML = "";
  groups.forEach((items, key) => {
    const groupCost = items.reduce((s,r)=>s+(r.costKnown?r.cost:0),0);
    const g = document.createElement("div");
    g.className = "group";
    g.innerHTML = `
      <div class="groupTitle"><div>${escapeHtml(key)}</div><span>$${groupCost.toFixed(2)}</span></div>
      ${items.map(r=>`
        <div class="itemRow">
          <div class="left">${escapeHtml(r.name)}</div>
          <div class="right">${prettyQty(r.qty)} ${escapeHtml(r.unit)}
            ${r.costKnown?` • $${r.cost.toFixed(2)} (${r.packs}×$${r.packPrice.toFixed(2)})`:` • <em>add price</em>`}
          </div>
        </div>`).join("")}`;
    listWrap.appendChild(g);
  });
}

$("refreshShopBtn").addEventListener("click", renderShopping);
$("storeFilter").addEventListener("change", renderShopping);
$("groupBy").addEventListener("change", renderShopping);
$("weekFilter").addEventListener("change", renderShopping);

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g,(m)=>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

// ===== Boot =====
renderToday();
renderWeek();
renderShopping();
setActiveTab("today");
