/************************************************************
 LOAD EXCEL MEALS
*************************************************************/
let MEALS = [];

async function loadMeals() {
  const res = await fetch("Monthly_Meal_Plan.xlsx");
  const buffer = await res.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  MEALS = XLSX.utils.sheet_to_json(sheet);
}

/************************************************************
 STATE
*************************************************************/
let activeView = "today";
let currentWeek = 1;

/************************************************************
 VIEW HANDLERS
*************************************************************/
const views = {
  today: document.getElementById("view-today"),
  week: document.getElementById("view-week"),
  month: document.getElementById("view-month"),
  shop: document.getElementById("view-shop"),
};

function show(view) {
  Object.keys(views).forEach(v => views[v].classList.add("hidden"));
  views[view].classList.remove("hidden");
  activeView = view;
}

/************************************************************
 NAV BUTTONS
*************************************************************/
document.getElementById("tab-today").onclick = () => show("today");
document.getElementById("tab-week").onclick = () => show("week");
document.getElementById("tab-month").onclick = () => show("month");
document.getElementById("tab-shop").onclick = () => show("shop");

/************************************************************
 RANDOMIZE (CYCLES WEEK 1–4)
*************************************************************/
document.getElementById("tab-randomize").onclick = () => {
  currentWeek++;
  if (currentWeek > 4) currentWeek = 1;
  renderWeek();
};

/************************************************************
 RENDERERS
*************************************************************/
function renderMeal(meal) {
  return `
    <div class="meal-card">
      <!-- IMAGE PLACEHOLDER – REPLACE URL LATER -->
      <img class="meal-img" src="${meal.ImageURL || 'https://images.unsplash.com/photo-1604908554162-18cf3f1a09a6?auto=format&fit=crop&w=1200&q=80'}">

      <h3>${meal.Meal}</h3>
      <div>${meal.Calories} kcal</div>

      <div class="dropdown">Ingredients ▾
        <ul>
          ${meal.Ingredients.split(",").map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>

      ${meal.Kids === "Yes" ? `<span class="kids-tag">Kids Menu</span>` : ""}
    </div>
  `;
}

function renderWeek() {
  views.week.innerHTML = `<h2>Week ${currentWeek}</h2>` + MEALS
    .filter(m => m.Week == currentWeek)
    .map(renderMeal).join("");
}

function renderMonth() {
  views.month.innerHTML = `<h2>Monthly View</h2>`;
  for (let w = 1; w <= 4; w++) {
    views.month.innerHTML += `<div class="meal-card">Week ${w}</div>`;
  }
}

function renderShopping() {
  views.shop.innerHTML = `
    <h2>Shopping List</h2>
    <table>
      <tr><th>Item</th><th>Store</th></tr>
      <tr><td>Eggs</td><td>Walmart</td></tr>
      <tr><td>Milk</td><td>Superstore</td></tr>
    </table>
  `;
}

/************************************************************
 INIT
*************************************************************/
(async function init() {
  await loadMeals();
  renderWeek();
  renderMonth();
  renderShopping();
})();
