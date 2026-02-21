const $ = (id) => document.getElementById(id);

// ===== Active week index (0-3, cycles) =====
let ACTIVE_WEEK_IDX = parseInt(localStorage.getItem("activeWeekIdx") || "0", 10) % 4;

function getActiveWeek() {
  return FOUR_WEEK_PLAN[ACTIVE_WEEK_IDX];
}

// ===== Views & Tabs =====
const VIEW_IDS  = ["today", "week", "month", "shop"];
const TAB_IDS   = ["tab-today", "tab-week", "tab-month", "tab-shop"];

function setActiveTab(which) {
  VIEW_IDS.forEach((v) => {
    const el = $("view-" + v);
    if (el) el.classList.toggle("hidden", v !== which);
  });
  TAB_IDS.forEach((tid) => {
    const t = $(tid);
    if (t) t.classList.toggle("active", tid === "tab-" + which);
  });
  // close month dropdown when switching
  $("weekDropdown").classList.remove("open");
}

$("tab-today").onclick = () => { setActiveTab("today"); renderToday(); };
$("tab-week").onclick  = () => { setActiveTab("week");  renderWeek(); };
$("tab-shop").onclick  = () => { setActiveTab("shop");  renderShopping(); };

// Month tab toggles dropdown
$("tab-month").onclick = (e) => {
  e.stopPropagation();
  const dd = $("weekDropdown");
  const isOpen = dd.classList.toggle("open");
  if (isOpen) {
    // if already in month view, don't re-trigger; just show picker
    setActiveTab("month");
    renderMonth(ACTIVE_WEEK_IDX);
  }
};

// Week tiles in dropdown
document.querySelectorAll(".weekTile").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const wi = parseInt(btn.dataset.week, 10);
    ACTIVE_WEEK_IDX = wi;
    localStorage.setItem("activeWeekIdx", wi);
    $("weekDropdown").classList.remove("open");
    setActiveTab("month");
    renderMonth(wi);
    // also update week/today silently
    renderToday();
    renderWeek();
  });
});

document.addEventListener("click", () => $("weekDropdown").classList.remove("open"));

// Randomize button — advance to next week, loop at 4
$("tab-rand").onclick = () => {
  ACTIVE_WEEK_IDX = (ACTIVE_WEEK_IDX + 1) % 4;
  localStorage.setItem("activeWeekIdx", ACTIVE_WEEK_IDX);
  renderToday();
  renderWeek();
  renderShopping();
  // if month is active, re-render
  if (!$("view-month").classList.contains("hidden")) renderMonth(ACTIVE_WEEK_IDX);
};

$("printBtn").onclick = () => window.print();

// ===== Date helpers =====
function weekdayIndexMondayFirst(date = new Date()) {
  return (date.getDay() + 6) % 7;
}
function formatDateLong(d) {
  return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric", year: "numeric" });
}

// ===== Card builder =====
function buildDropdownBtn(label, items, extraClass) {
  const wrap = document.createElement("div");
  wrap.className = "dropWrap " + (extraClass || "");

  const btn = document.createElement("button");
  btn.className = "tag tagDrop";
  btn.innerHTML = label + " <span class='dropArrow'>▾</span>";

  const panel = document.createElement("div");
  panel.className = "dropPanel";
  panel.innerHTML = items.length
    ? items.map(i => `<div class="dropItem">${escapeHtml(i)}</div>`).join("")
    : `<div class="dropItem muted">—</div>`;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = panel.classList.toggle("open");
    // close all other dropdowns
    document.querySelectorAll(".dropPanel.open").forEach(p => {
      if (p !== panel) p.classList.remove("open");
    });
  });

  wrap.appendChild(btn);
  wrap.appendChild(panel);
  return wrap;
}

document.addEventListener("click", () => {
  document.querySelectorAll(".dropPanel.open").forEach(p => p.classList.remove("open"));
});

function renderMealCard(typeLabel, m, mealType) {
  const ingList = (m.ingredients || [])
    .map((x) => `${x.name} — ${prettyQty(x.qty)} ${x.unit}`)
    ;
  const steps = (m.steps || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("");

  const el = document.createElement("div");
  el.className = "card";

  const imgHtml = m.image
    ? `<img class="mealImg" src="${escapeHtml(m.image)}" alt="${escapeHtml(m.title || "Meal")}" loading="lazy" referrerpolicy="no-referrer" crossorigin="anonymous" onerror="this.style.display='none'; this.parentElement.classList.add('imgError');" />`
    : `<div class="mealImg placeholder"></div>`;

  el.innerHTML = `
    <div class="imgWrap">${imgHtml}</div>
    <div class="cardTop">
      <div>
        <div class="mealType">${escapeHtml(typeLabel)}</div>
        <div class="mealName">${escapeHtml(m.title || "")}</div>
        <div class="small">${escapeHtml(m.cuisine || "")}</div>
      </div>
      <div class="kcal">${Number(m.kcalPerServing || 0)} kcal</div>
    </div>
    <div class="tags" id="tags-placeholder-${Math.random().toString(36).slice(2)}"></div>
    <div class="details">
      <h3>Recipe Steps</h3>
      <ol>${steps}</ol>
      ${m.note ? `<div class="small"><strong>Note:</strong> ${escapeHtml(m.note)}</div>` : ""}
    </div>
  `;

  // Build tag area with dropdowns
  const tagsArea = el.querySelector(".tags");

  // Ingredients dropdown (all meal types)
  tagsArea.appendChild(buildDropdownBtn("🧂 Ingredients", ingList));

  // Kids menu dropdown (lunch only)
  if (mealType === "lunch") {
    const km = m.kidsMenu;
    const kidsItems = km
      ? [`${km.title}`, `~${km.kcal} kcal`]
      : ["No kids menu listed"];
    tagsArea.appendChild(buildDropdownBtn("👦 Kids Menu", kidsItems, "tagKids"));
  }

  // Expand card on click (but not on dropdown clicks)
  el.addEventListener("click", (e) => {
    if (e.target.closest(".dropWrap")) return;
    el.classList.toggle("expanded");
  });

  return el;
}

// ===== Render Today =====
function renderToday() {
  const week = getActiveWeek();
  const idx = weekdayIndexMondayFirst(new Date());
  const day = week.days[idx];

  $("todayTitle").textContent = "Today";
  $("todayPill").textContent = `${day.name} • ${formatDateLong(new Date())}`;
  $("subtitle").textContent = `${FAMILY.location} • Family of ${FAMILY.size} • ${week.weekLabel}`;

  const wrap = $("todayCards");
  wrap.innerHTML = "";
  wrap.appendChild(renderMealCard("Breakfast", day.breakfast, "breakfast"));
  wrap.appendChild(renderMealCard("Lunch", day.lunch, "lunch"));
  wrap.appendChild(renderMealCard("Dinner", day.dinner, "dinner"));
}

// ===== Render Week =====
function renderWeek() {
  const week = getActiveWeek();
  $("weekTitle").textContent = `Week Plan — ${week.weekLabel}`;
  $("weekPill").textContent = "Mon → Sun";

  const tabsWrap = $("dayTabs");
  const cardsWrap = $("weekCards");
  tabsWrap.innerHTML = "";

  let activeIdx = weekdayIndexMondayFirst(new Date());

  week.days.forEach((d, i) => {
    const b = document.createElement("button");
    b.className = "dayTab" + (i === activeIdx ? " active" : "");
    b.textContent = d.name.slice(0, 3);
    b.onclick = () => {
      activeIdx = i;
      [...tabsWrap.children].forEach((x, j) => x.classList.toggle("active", j === i));
      renderWeekCards(i);
    };
    tabsWrap.appendChild(b);
  });

  function renderWeekCards(i) {
    const day = week.days[i];
    cardsWrap.innerHTML = "";
    cardsWrap.appendChild(renderMealCard(`${day.name} • Breakfast`, day.breakfast, "breakfast"));
    cardsWrap.appendChild(renderMealCard(`${day.name} • Lunch`, day.lunch, "lunch"));
    cardsWrap.appendChild(renderMealCard(`${day.name} • Dinner`, day.dinner, "dinner"));
  }

  renderWeekCards(activeIdx);
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
      const dayTile = document.createElement("div");
      dayTile.className = "monthDayTile";

      dayTile.innerHTML = `
        <div class="monthDayName">${day.name.slice(0, 3)}</div>
        <div class="monthMealRow"><span class="mTypeLabel">B</span><span class="mTitle">${escapeHtml(day.breakfast.title)}</span></div>
        <div class="monthMealRow"><span class="mTypeLabel lunch">L</span><span class="mTitle">${escapeHtml(day.lunch.title)}</span></div>
        <div class="monthMealRow"><span class="mTypeLabel dinner">D</span><span class="mTitle">${escapeHtml(day.dinner.title)}</span></div>
      `;

      // Click tile to jump to that week's day view
      dayTile.addEventListener("click", () => {
        ACTIVE_WEEK_IDX = wi;
        localStorage.setItem("activeWeekIdx", wi);
        setActiveTab("week");
        renderWeek();
      });

      daysGrid.appendChild(dayTile);
    });

    weekBlock.appendChild(daysGrid);
    grid.appendChild(weekBlock);
  });
}

// ===== Shopping list =====
function toBaseUnit(qty, unit) {
  const u = String(unit || "").toLowerCase();
  if (u === "kg")  return { qty: qty * 1000, unit: "g" };
  if (u === "g")   return { qty, unit: "g" };
  if (u === "l")   return { qty: qty * 1000, unit: "ml" };
  if (u === "ml")  return { qty, unit: "ml" };
  return { qty, unit: "pcs" };
}
function fromBaseUnit(qty, unit) {
  if (unit === "g"  && qty >= 1000) return { qty: qty / 1000, unit: "kg" };
  if (unit === "ml" && qty >= 1000) return { qty: qty / 1000, unit: "L" };
  return { qty, unit };
}
function buildWeeklyIngredientTotals(weekPlan) {
  const totals = new Map();
  weekPlan.days.forEach((d) => {
    [d.breakfast, d.lunch, d.dinner].forEach((m) => {
      (m.ingredients || []).forEach((x) => {
        const base = toBaseUnit(x.qty, x.unit);
        const key = x.name;
        const prev = totals.get(key);
        if (!prev) totals.set(key, { qty: base.qty, unit: base.unit });
        else totals.set(key, { qty: prev.qty + base.qty, unit: prev.unit });
      });
    });
  });
  return totals;
}
function estimateCostForItem(name, totalBase) {
  const pb = PRICE_BOOK[name];
  if (!pb) return { known: false, cost: 0, store: "Unknown", packs: 0, packPrice: 0 };
  const packBase = toBaseUnit(pb.packSize, pb.unit);
  const packs = packBase.qty > 0 ? Math.ceil(totalBase.qty / packBase.qty) : 0;
  const cost = packs * pb.price;
  return { known: true, cost, store: pb.store, packs, packPrice: pb.price };
}
function inferCategory(name) {
  const pb = PRICE_BOOK[name];
  if (pb?.category) return pb.category;
  const n = String(name).toLowerCase();
  if (n.includes("chicken") || n.includes("beef") || n.includes("salmon") || n.includes("tuna") || n.includes("fish") || n.includes("shrimp") || n.includes("sausage")) return "Meat/Fish";
  if (n.includes("milk") || n.includes("cheese") || n.includes("yogurt") || n.includes("eggs") || n.includes("butter")) return "Dairy";
  if (n.includes("rice") || n.includes("oats") || n.includes("pasta") || n.includes("flour") || n.includes("beans") || n.includes("egusi") || n.includes("oil") || n.includes("cereal") || n.includes("bread")) return "Pantry";
  if (n.includes("onion") || n.includes("tomato") || n.includes("pepper") || n.includes("banana") || n.includes("berries") || n.includes("apple") || n.includes("carrot") || n.includes("lettuce") || n.includes("cucumber") || n.includes("potato") || n.includes("plantain") || n.includes("yam") || n.includes("vegetable")) return "Produce";
  return "Other";
}
function prettyQty(q) {
  if (Number.isInteger(q)) return String(q);
  return String(Math.round(q * 100) / 100);
}

function renderShopping() {
  const weekIdx = parseInt($("weekFilter").value, 10);
  const weekPlan = FOUR_WEEK_PLAN[weekIdx];
  const totals = buildWeeklyIngredientTotals(weekPlan);
  const storeFilter = $("storeFilter").value;
  const groupBy = $("groupBy").value;

  const rows = [];
  totals.forEach((base, name) => {
    const shown = fromBaseUnit(base.qty, base.unit);
    const costInfo = estimateCostForItem(name, base);
    rows.push({
      name,
      qty: shown.qty,
      unit: shown.unit,
      category: inferCategory(name),
      store: costInfo.known ? costInfo.store : "Unknown",
      costKnown: costInfo.known,
      cost: costInfo.cost,
      packs: costInfo.packs,
      packPrice: costInfo.packPrice,
    });
  });

  const filtered = rows.filter((r) => storeFilter === "ALL" || r.store === storeFilter);
  const totalCost = filtered.reduce((s, r) => s + (r.costKnown ? r.cost : 0), 0);
  const unknownCount = filtered.filter((r) => !r.costKnown).length;

  $("budgetPill").textContent = `Est. total: $${totalCost.toFixed(2)}` + (unknownCount ? ` • ${unknownCount} need a price` : "");

  const storeTotals = {};
  filtered.forEach((r) => {
    if (!r.costKnown) return;
    storeTotals[r.store] = (storeTotals[r.store] || 0) + r.cost;
  });

  $("shopSummary").innerHTML = `
    <div><strong>${weekPlan.weekLabel}</strong> — sums ingredients across Mon–Sun, rounds up to pack sizes.</div>
    <div class="small" style="margin-top:8px;">
      ${Object.keys(storeTotals).length
        ? Object.entries(storeTotals).map(([k, v]) => `${escapeHtml(k)}: <strong>$${v.toFixed(2)}</strong>`).join(" • ")
        : "Add more items to PRICE_BOOK in data.js."}
    </div>
  `;

  const groups = new Map();
  filtered.sort((a, b) => a.name.localeCompare(b.name)).forEach((r) => {
    const key = groupBy === "store" ? r.store : r.category;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  });

  const listWrap = $("shopList");
  listWrap.innerHTML = "";

  groups.forEach((items, key) => {
    const groupCost = items.reduce((s, r) => s + (r.costKnown ? r.cost : 0), 0);
    const g = document.createElement("div");
    g.className = "group";
    g.innerHTML = `
      <div class="groupTitle"><div>${escapeHtml(key)}</div><span>$${groupCost.toFixed(2)}</span></div>
      ${items.map((r) => `
        <div class="itemRow">
          <div class="left">${escapeHtml(r.name)}</div>
          <div class="right">
            ${prettyQty(r.qty)} ${escapeHtml(r.unit)}
            ${r.costKnown ? ` • $${r.cost.toFixed(2)} (${r.packs}×$${r.packPrice.toFixed(2)})` : ` • <em>add price</em>`}
          </div>
        </div>`).join("")}
    `;
    listWrap.appendChild(g);
  });
}

$("refreshShopBtn").addEventListener("click", renderShopping);
$("storeFilter").addEventListener("change", renderShopping);
$("groupBy").addEventListener("change", renderShopping);
$("weekFilter").addEventListener("change", renderShopping);

// ===== Utils =====
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]));
}

// ===== Initial render =====
renderToday();
renderWeek();
renderShopping();
setActiveTab("today");
