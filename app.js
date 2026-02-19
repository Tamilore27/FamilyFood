let MEALS = [];
let currentView = "today";
let currentWeek = 1;

const views = {
  today: document.getElementById("view-today"),
  week: document.getElementById("view-week"),
  month: document.getElementById("view-month"),
  shop: document.getElementById("view-shop"),
};

function show(view) {
  Object.values(views).forEach(v => v.classList.add("hidden"));
  views[view].classList.remove("hidden");
}

document.getElementById("tab-today").onclick = () => show("today");
document.getElementById("tab-week").onclick = () => show("week");
document.getElementById("tab-month").onclick = () => show("month");
document.getElementById("tab-shop").onclick = () => show("shop");

document.getElementById("tab-randomize").onclick = () => {
  currentWeek++;
  if (currentWeek > 4) currentWeek = 1;
  renderWeek();
};

async function loadExcel() {
  const res = await fetch("Monthly_Meal_Plan.xlsx");
  const buffer = await res.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  MEALS = XLSX.utils.sheet_to_json(sheet);
}

function renderCard(title, meal, kidsMeal = null) {
  return `
    <div class="card">
      <!-- IMAGE PLACEHOLDER: replace URL later -->
      <img src="https://images.unsplash.com/photo-1604908177453-7462950a6b94?auto=format&fit=crop&w=1200&q=80">

      <div class="kcal-badge">650 kcal</div>

      <h3>${title}</h3>

      <div class="dropdown">Ingredients ▾
        <div class="dropdown-content">
          <ul><li>Ingredient list from lookup</li></ul>
        </div>
      </div>

      ${kidsMeal ? `
        <div class="dropdown">Kids Menu ▾
          <div class="dropdown-content">${kidsMeal}</div>
        </div>
      ` : ""}
    </div>
  `;
}

function renderWeek() {
  views.week.innerHTML = `<h2>Week ${currentWeek}</h2>`;
  MEALS.forEach(m => {
    views.week.innerHTML += `
      <h4>${m.Day}</h4>
      ${renderCard("Breakfast", m["Breakfast (Family)"])}
      ${renderCard("Lunch", m["Lunch (Adults)"], m["Kids Lunch (School)"])}
      ${renderCard("Dinner", m["Dinner (Family)"])}
    `;
  });
}

function renderMonth() {
  views.month.innerHTML = `<h2>Month View</h2>`;
  for (let i = 1; i <= 4; i++) {
    views.month.innerHTML += `<div class="card">Week ${i}</div>`;
  }
}

function renderShop() {
  views.shop.innerHTML = `
    <table class="shop-table">
      <tr><th>Item</th><th>Store</th></tr>
      <tr><td>Eggs</td><td>Walmart</td></tr>
      <tr><td>Milk</td><td>Superstore</td></tr>
      <tr><td>Bread</td><td>Walmart</td></tr>
    </table>
  `;
}

(async function init() {
  await loadExcel();
  renderWeek();
  renderMonth();
  renderShop();
  show("today");
})();
