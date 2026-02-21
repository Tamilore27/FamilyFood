// ====== SETTINGS ======
const FAMILY = { size: 4, location: "Ottawa" };

// ====== IMAGE LIBRARY ======
const IMAGE_LIBRARY = {
  sandwich:   "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80",
  cereal:     "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=1200&q=80",
  pancakes:   "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&w=1200&q=80",
  bread:      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80",
  yam:        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80",

  jollof:     "https://images.unsplash.com/photo-1604908554069-6d7e0a6a5d47?auto=format&fit=crop&w=1200&q=80",
  salad:      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80",
  stirfry:    "https://images.unsplash.com/photo-1604908554162-18cf3f1a09a6?auto=format&fit=crop&w=1200&q=80",
  tuna:       "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1200&q=80",
  puffpuff:   "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
  friedrice:  "https://images.unsplash.com/photo-1604908177453-7462950a6b94?auto=format&fit=crop&w=1200&q=80",
  whiteerice: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1200&q=80",
  wrap:       "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80",
  meatpie:    "https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?auto=format&fit=crop&w=1200&q=80",
  lightbowl:  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",

  salmon:     "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
  souppepper: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  fish:       "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
  pasta:      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
  pizza:      "https://images.unsplash.com/photo-1548365328-9f547f9a7ce3?auto=format&fit=crop&w=1200&q=80",
  egusi:      "https://images.unsplash.com/photo-1604908554207-2c6c5c1397d1?auto=format&fit=crop&w=1200&q=80",
  grilled:    "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80",
  beefstir:   "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1200&q=80",
};

// ====== PRICE BOOK ======
const PRICE_BOOK = {
  "Bread":              { store: "Walmart",      unit: "pcs", packSize: 1,   price: 3.49,  category: "Pantry" },
  "Cereal":             { store: "Walmart",      unit: "kg",  packSize: 0.8, price: 5.99,  category: "Pantry" },
  "Milk":               { store: "Walmart",      unit: "L",   packSize: 4,   price: 6.49,  category: "Dairy" },
  "Eggs":               { store: "Walmart",      unit: "pcs", packSize: 30,  price: 10.99, category: "Dairy" },
  "Butter":             { store: "Walmart",      unit: "pcs", packSize: 1,   price: 5.49,  category: "Dairy" },
  "Flour":              { store: "Costco",       unit: "kg",  packSize: 10,  price: 14.99, category: "Pantry" },
  "Pancake mix":        { store: "Walmart",      unit: "kg",  packSize: 1,   price: 4.99,  category: "Pantry" },
  "Rice":               { store: "Costco",       unit: "kg",  packSize: 10,  price: 24.99, category: "Pantry" },
  "Pasta":              { store: "Walmart",      unit: "kg",  packSize: 1,   price: 3.49,  category: "Pantry" },
  "Pasta sauce":        { store: "Walmart",      unit: "pcs", packSize: 1,   price: 2.99,  category: "Pantry" },
  "Jollof seasoning":   { store: "AfricanStore", unit: "pcs", packSize: 1,   price: 2.49,  category: "Pantry" },
  "Beans":              { store: "AfricanStore", unit: "kg",  packSize: 2,   price: 9.99,  category: "Pantry" },
  "Palm oil":           { store: "AfricanStore", unit: "L",   packSize: 1,   price: 9.99,  category: "Pantry" },
  "Egusi":              { store: "AfricanStore", unit: "kg",  packSize: 1,   price: 12.99, category: "Pantry" },
  "Olive oil":          { store: "Costco",       unit: "L",   packSize: 1,   price: 11.99, category: "Pantry" },
  "Yam":                { store: "AfricanStore", unit: "kg",  packSize: 2,   price: 7.99,  category: "Produce" },
  "Plantain":           { store: "AfricanStore", unit: "pcs", packSize: 3,   price: 3.99,  category: "Produce" },
  "Tomatoes":           { store: "Walmart",      unit: "kg",  packSize: 1,   price: 4.49,  category: "Produce" },
  "Onions":             { store: "Costco",       unit: "kg",  packSize: 3,   price: 6.99,  category: "Produce" },
  "Bell pepper":        { store: "Costco",       unit: "kg",  packSize: 1.5, price: 7.99,  category: "Produce" },
  "Lettuce":            { store: "Walmart",      unit: "pcs", packSize: 1,   price: 2.99,  category: "Produce" },
  "Cucumber":           { store: "Walmart",      unit: "pcs", packSize: 1,   price: 1.49,  category: "Produce" },
  "Carrots":            { store: "Costco",       unit: "kg",  packSize: 2,   price: 4.99,  category: "Produce" },
  "Mixed vegetables":   { store: "Costco",       unit: "kg",  packSize: 1,   price: 5.99,  category: "Produce" },
  "Potatoes":           { store: "Costco",       unit: "kg",  packSize: 4.5, price: 8.99,  category: "Produce" },
  "Chicken thighs":     { store: "Costco",       unit: "kg",  packSize: 3,   price: 29.99, category: "Meat/Fish" },
  "Ground beef":        { store: "Costco",       unit: "kg",  packSize: 1.5, price: 19.99, category: "Meat/Fish" },
  "Beef":               { store: "Costco",       unit: "kg",  packSize: 1.5, price: 21.99, category: "Meat/Fish" },
  "Salmon":             { store: "Costco",       unit: "kg",  packSize: 1,   price: 24.99, category: "Meat/Fish" },
  "Shrimp":             { store: "Costco",       unit: "kg",  packSize: 1,   price: 22.99, category: "Meat/Fish" },
  "Fish fillets":       { store: "Costco",       unit: "kg",  packSize: 1,   price: 18.99, category: "Meat/Fish" },
  "Tuna (canned)":      { store: "Walmart",      unit: "pcs", packSize: 4,   price: 6.49,  category: "Meat/Fish" },
  "Sausages":           { store: "Walmart",      unit: "pcs", packSize: 1,   price: 7.99,  category: "Meat/Fish" },
};

// ====== KIDS MENU LOOKUP ======
// Maps adult lunch title → kids lunch
const KIDS_MENU_MAP = {
  // Week 1
  "Jollof rice & chicken":    { title: "Jollof rice", kcal: 450 },
  "Chicken salad":            { title: "Pancakes, eggs & sausages", kcal: 480 },
  "Rice & chicken stir-fry":  { title: "Pasta & sauce", kcal: 400 },
  "Jollof rice & fish":       { title: "Kids fried rice", kcal: 430 },
  "Healthy tuna wrap":        { title: "Bread, butter & jam / sandwiches", kcal: 380 },
  // Week 2
  "Fried rice & chicken":     { title: "Kids fried rice", kcal: 430 },
  "Shrimp salad":             { title: "Pancakes, eggs & sausages", kcal: 480 },
  "Fried rice & shrimp":      { title: "Jollof rice", kcal: 450 },
  "Healthy veggie wrap":      { title: "Bread, butter & jam / sandwiches", kcal: 380 },
  // Week 3
  "White rice & chicken stew":{ title: "White rice & stew", kcal: 440 },
  "Beef salad":               { title: "Pancakes, eggs & sausages", kcal: 480 },
  "White rice & grilled fish":{ title: "Kids fried rice", kcal: 430 },
  "Healthy tuna wrap (wk3)":  { title: "White rice & butter chicken", kcal: 450 },
  // Week 4
  "White rice & beans":       { title: "White rice & stew", kcal: 440 },
  "White rice & beans + plantain": { title: "Kids fried rice", kcal: 430 },
};

// ====== CALORIE LOOKUP ======
const KCAL_MAP = {
  // Breakfast
  "Sandwich":           480,
  "Cereal":             380,
  "Pancakes & eggs":    520,
  "Bread & egg":        420,
  "Yam & egg":          500,
  // Lunch
  "Jollof rice & chicken":       650,
  "Chicken salad":               520,
  "Rice & chicken stir-fry":     600,
  "Jollof rice & fish":          620,
  "Healthy tuna wrap":           480,
  "Puff puff / samosa":          550,
  "Light veggie bowl":           320,
  "Fried rice & chicken":        660,
  "Shrimp salad":                490,
  "Fried rice & shrimp":         640,
  "Healthy veggie wrap":         450,
  "Meat pie / sausage roll":     560,
  "Light salad & grilled fish":  420,
  "White rice & chicken stew":   630,
  "Beef salad":                  510,
  "White rice & grilled fish":   600,
  "Grilled chicken + veggies & potatoes": 580,
  "White rice & beans":          580,
  "White rice & beans + plantain": 640,
  "Light salad & grilled chicken": 440,
  // Dinner
  "Salmon & stir-fry veggies":   620,
  "Beef pepper soup":            480,
  "Grilled fish & veggies":      520,
  "Pasta & shrimp":              700,
  "Pizza":                       820,
  "Leftover pasta & shrimp":     680,
  "Eba & Egusi":                 750,
  "Chicken pepper soup":         460,
  "Leftover pasta":              650,
  "Beef pepper soup (wk2)":      480,
  "Eba & Okra":                  680,
  "Pasta & chicken":             710,
  "Pasta (special)":             730,
  "Grilled chicken + veggies & potatoes (din)": 590,
  "Leftover pasta & shrimp (wk3)": 680,
  "Salmon & stir-fry veggies (wk4)": 620,
  "Rice & beef stir-fry":        690,
  "Leftover pasta & chicken":    670,
  "Chicken pepper soup (wk4)":   460,
};

// ====== INGREDIENT LOOKUP ======
function getIngredients(mealTitle) {
  const map = {
    "Sandwich":           [{ name: "Bread", qty: 1, unit: "pcs" }, { name: "Butter", qty: 0.05, unit: "kg" }, { name: "Eggs", qty: 4, unit: "pcs" }],
    "Cereal":             [{ name: "Cereal", qty: 0.2, unit: "kg" }, { name: "Milk", qty: 0.5, unit: "L" }],
    "Pancakes & eggs":    [{ name: "Pancake mix", qty: 0.3, unit: "kg" }, { name: "Eggs", qty: 6, unit: "pcs" }, { name: "Milk", qty: 0.3, unit: "L" }, { name: "Butter", qty: 0.05, unit: "kg" }],
    "Bread & egg":        [{ name: "Bread", qty: 1, unit: "pcs" }, { name: "Eggs", qty: 4, unit: "pcs" }, { name: "Butter", qty: 0.05, unit: "kg" }],
    "Yam & egg":          [{ name: "Yam", qty: 1, unit: "kg" }, { name: "Eggs", qty: 4, unit: "pcs" }, { name: "Palm oil", qty: 0.05, unit: "L" }],

    "Jollof rice & chicken":      [{ name: "Rice", qty: 0.7, unit: "kg" }, { name: "Chicken thighs", qty: 1.2, unit: "kg" }, { name: "Tomatoes", qty: 0.5, unit: "kg" }, { name: "Onions", qty: 0.3, unit: "kg" }, { name: "Bell pepper", qty: 0.3, unit: "kg" }, { name: "Jollof seasoning", qty: 1, unit: "pcs" }],
    "Chicken salad":              [{ name: "Chicken thighs", qty: 0.8, unit: "kg" }, { name: "Lettuce", qty: 1, unit: "pcs" }, { name: "Cucumber", qty: 1, unit: "pcs" }, { name: "Tomatoes", qty: 0.3, unit: "kg" }, { name: "Olive oil", qty: 0.05, unit: "L" }],
    "Rice & chicken stir-fry":    [{ name: "Rice", qty: 0.6, unit: "kg" }, { name: "Chicken thighs", qty: 0.8, unit: "kg" }, { name: "Mixed vegetables", qty: 0.4, unit: "kg" }, { name: "Olive oil", qty: 0.05, unit: "L" }],
    "Jollof rice & fish":         [{ name: "Rice", qty: 0.7, unit: "kg" }, { name: "Fish fillets", qty: 0.8, unit: "kg" }, { name: "Tomatoes", qty: 0.5, unit: "kg" }, { name: "Onions", qty: 0.3, unit: "kg" }, { name: "Jollof seasoning", qty: 1, unit: "pcs" }],
    "Healthy tuna wrap":          [{ name: "Tuna (canned)", qty: 2, unit: "pcs" }, { name: "Lettuce", qty: 1, unit: "pcs" }, { name: "Cucumber", qty: 1, unit: "pcs" }, { name: "Bread", qty: 1, unit: "pcs" }],
    "Puff puff / samosa":         [{ name: "Flour", qty: 0.4, unit: "kg" }, { name: "Eggs", qty: 2, unit: "pcs" }, { name: "Palm oil", qty: 0.1, unit: "L" }],
    "Light veggie bowl":          [{ name: "Mixed vegetables", qty: 0.6, unit: "kg" }, { name: "Olive oil", qty: 0.05, unit: "L" }],
    "Fried rice & chicken":       [{ name: "Rice", qty: 0.7, unit: "kg" }, { name: "Chicken thighs", qty: 1.0, unit: "kg" }, { name: "Eggs", qty: 2, unit: "pcs" }, { name: "Mixed vegetables", qty: 0.4, unit: "kg" }],
    "Shrimp salad":               [{ name: "Shrimp", qty: 0.5, unit: "kg" }, { name: "Lettuce", qty: 1, unit: "pcs" }, { name: "Cucumber", qty: 1, unit: "pcs" }, { name: "Tomatoes", qty: 0.3, unit: "kg" }],
    "Fried rice & shrimp":        [{ name: "Rice", qty: 0.7, unit: "kg" }, { name: "Shrimp", qty: 0.6, unit: "kg" }, { name: "Eggs", qty: 2, unit: "pcs" }, { name: "Mixed vegetables", qty: 0.4, unit: "kg" }],
    "Healthy veggie wrap":        [{ name: "Mixed vegetables", qty: 0.5, unit: "kg" }, { name: "Bread", qty: 1, unit: "pcs" }, { name: "Olive oil", qty: 0.05, unit: "L" }],
    "Meat pie / sausage roll":    [{ name: "Flour", qty: 0.5, unit: "kg" }, { name: "Ground beef", qty: 0.4, unit: "kg" }, { name: "Onions", qty: 0.2, unit: "kg" }],
    "Light salad & grilled fish": [{ name: "Fish fillets", qty: 0.7, unit: "kg" }, { name: "Lettuce", qty: 1, unit: "pcs" }, { name: "Tomatoes", qty: 0.3, unit: "kg" }, { name: "Olive oil", qty: 0.05, unit: "L" }],
    "White rice & chicken stew":  [{ name: "Rice", qty: 0.7, unit: "kg" }, { name: "Chicken thighs", qty: 1.0, unit: "kg" }, { name: "Tomatoes", qty: 0.5, unit: "kg" }, { name: "Onions", qty: 0.3, unit: "kg" }],
    "Beef salad":                 [{ name: "Beef", qty: 0.5, unit: "kg" }, { name: "Lettuce", qty: 1, unit: "pcs" }, { name: "Cucumber", qty: 1, unit: "pcs" }, { name: "Tomatoes", qty: 0.3, unit: "kg" }],
    "White rice & grilled fish":  [{ name: "Rice", qty: 0.7, unit: "kg" }, { name: "Fish fillets", qty: 0.8, unit: "kg" }, { name: "Olive oil", qty: 0.05, unit: "L" }],
    "White rice & beans":         [{ name: "Rice", qty: 0.5, unit: "kg" }, { name: "Beans", qty: 0.4, unit: "kg" }, { name: "Palm oil", qty: 0.05, unit: "L" }, { name: "Onions", qty: 0.2, unit: "kg" }],
    "White rice & beans + plantain": [{ name: "Rice", qty: 0.5, unit: "kg" }, { name: "Beans", qty: 0.4, unit: "kg" }, { name: "Plantain", qty: 2, unit: "pcs" }, { name: "Palm oil", qty: 0.05, unit: "L" }],
    "Light salad & grilled chicken": [{ name: "Chicken thighs", qty: 0.7, unit: "kg" }, { name: "Lettuce", qty: 1, unit: "pcs" }, { name: "Tomatoes", qty: 0.3, unit: "kg" }, { name: "Olive oil", qty: 0.05, unit: "L" }],

    "Salmon & stir-fry veggies":  [{ name: "Salmon", qty: 1.0, unit: "kg" }, { name: "Mixed vegetables", qty: 0.5, unit: "kg" }, { name: "Olive oil", qty: 0.05, unit: "L" }],
    "Beef pepper soup":           [{ name: "Beef", qty: 1.0, unit: "kg" }, { name: "Onions", qty: 0.3, unit: "kg" }, { name: "Bell pepper", qty: 0.3, unit: "kg" }],
    "Grilled fish & veggies":     [{ name: "Fish fillets", qty: 1.0, unit: "kg" }, { name: "Mixed vegetables", qty: 0.5, unit: "kg" }, { name: "Olive oil", qty: 0.05, unit: "L" }],
    "Pasta & shrimp":             [{ name: "Pasta", qty: 0.5, unit: "kg" }, { name: "Shrimp", qty: 0.6, unit: "kg" }, { name: "Pasta sauce", qty: 1, unit: "pcs" }, { name: "Onions", qty: 0.2, unit: "kg" }],
    "Pizza":                      [{ name: "Flour", qty: 0.5, unit: "kg" }, { name: "Pasta sauce", qty: 1, unit: "pcs" }, { name: "Ground beef", qty: 0.4, unit: "kg" }, { name: "Eggs", qty: 2, unit: "pcs" }],
    "Leftover pasta & shrimp":    [{ name: "Pasta", qty: 0.3, unit: "kg" }, { name: "Shrimp", qty: 0.3, unit: "kg" }],
    "Eba & Egusi":                [{ name: "Egusi", qty: 0.4, unit: "kg" }, { name: "Palm oil", qty: 0.1, unit: "L" }, { name: "Onions", qty: 0.3, unit: "kg" }],
    "Chicken pepper soup":        [{ name: "Chicken thighs", qty: 1.0, unit: "kg" }, { name: "Onions", qty: 0.3, unit: "kg" }, { name: "Bell pepper", qty: 0.3, unit: "kg" }],
    "Leftover pasta":             [{ name: "Pasta", qty: 0.4, unit: "kg" }, { name: "Pasta sauce", qty: 1, unit: "pcs" }],
    "Pasta & chicken":            [{ name: "Pasta", qty: 0.5, unit: "kg" }, { name: "Chicken thighs", qty: 0.8, unit: "kg" }, { name: "Pasta sauce", qty: 1, unit: "pcs" }],
    "Pasta (special)":            [{ name: "Pasta", qty: 0.6, unit: "kg" }, { name: "Shrimp", qty: 0.4, unit: "kg" }, { name: "Pasta sauce", qty: 1, unit: "pcs" }],
    "Eba & Okra":                 [{ name: "Palm oil", qty: 0.1, unit: "L" }, { name: "Onions", qty: 0.2, unit: "kg" }],
    "Grilled chicken + veggies & potatoes": [{ name: "Chicken thighs", qty: 1.0, unit: "kg" }, { name: "Potatoes", qty: 0.8, unit: "kg" }, { name: "Mixed vegetables", qty: 0.4, unit: "kg" }, { name: "Olive oil", qty: 0.05, unit: "L" }],
    "Leftover pasta & shrimp (wk3)": [{ name: "Pasta", qty: 0.3, unit: "kg" }, { name: "Shrimp", qty: 0.3, unit: "kg" }],
    "Rice & beef stir-fry":       [{ name: "Rice", qty: 0.6, unit: "kg" }, { name: "Beef", qty: 0.8, unit: "kg" }, { name: "Mixed vegetables", qty: 0.4, unit: "kg" }, { name: "Olive oil", qty: 0.05, unit: "L" }],
    "Leftover pasta & chicken":   [{ name: "Pasta", qty: 0.3, unit: "kg" }, { name: "Chicken thighs", qty: 0.3, unit: "kg" }],
    "Chicken pepper soup (wk4)":  [{ name: "Chicken thighs", qty: 1.0, unit: "kg" }, { name: "Onions", qty: 0.3, unit: "kg" }, { name: "Bell pepper", qty: 0.3, unit: "kg" }],
  };
  return map[mealTitle] || [{ name: mealTitle, qty: 1, unit: "serving" }];
}

function getImage(mealTitle) {
  const t = mealTitle.toLowerCase();
  if (t.includes("sandwich")) return IMAGE_LIBRARY.sandwich;
  if (t.includes("cereal")) return IMAGE_LIBRARY.cereal;
  if (t.includes("pancake")) return IMAGE_LIBRARY.pancakes;
  if (t.includes("bread") || t.includes("egg") && t.includes("bread")) return IMAGE_LIBRARY.bread;
  if (t.includes("yam")) return IMAGE_LIBRARY.yam;
  if (t.includes("jollof")) return IMAGE_LIBRARY.jollof;
  if (t.includes("salad")) return IMAGE_LIBRARY.salad;
  if (t.includes("stir-fry") || t.includes("stir fry")) return IMAGE_LIBRARY.stirfry;
  if (t.includes("tuna") || t.includes("wrap")) return IMAGE_LIBRARY.tuna;
  if (t.includes("puff") || t.includes("samosa")) return IMAGE_LIBRARY.puffpuff;
  if (t.includes("fried rice")) return IMAGE_LIBRARY.friedrice;
  if (t.includes("white rice")) return IMAGE_LIBRARY.whiteerice;
  if (t.includes("veggie bowl") || t.includes("light")) return IMAGE_LIBRARY.lightbowl;
  if (t.includes("meat pie") || t.includes("sausage roll")) return IMAGE_LIBRARY.meatpie;
  if (t.includes("salmon")) return IMAGE_LIBRARY.salmon;
  if (t.includes("pepper soup")) return IMAGE_LIBRARY.souppepper;
  if (t.includes("fish")) return IMAGE_LIBRARY.fish;
  if (t.includes("pasta") || t.includes("eba")) return IMAGE_LIBRARY.pasta;
  if (t.includes("pizza")) return IMAGE_LIBRARY.pizza;
  if (t.includes("egusi") || t.includes("okra")) return IMAGE_LIBRARY.egusi;
  if (t.includes("grilled chicken") || t.includes("grilled fish")) return IMAGE_LIBRARY.grilled;
  if (t.includes("beef stir") || t.includes("beef pepper")) return IMAGE_LIBRARY.beefstir;
  return IMAGE_LIBRARY.sandwich;
}

function makeMeal(title, mealType) {
  const kcal = KCAL_MAP[title] || 500;
  const ingredients = getIngredients(title);
  const kidsEntry = mealType === "lunch" ? (KIDS_MENU_MAP[title] || null) : null;

  return {
    title,
    cuisine: title.toLowerCase().includes("jollof") || title.toLowerCase().includes("egusi") || title.toLowerCase().includes("eba") || title.toLowerCase().includes("puff") ? "Nigerian" :
             title.toLowerCase().includes("pasta") || title.toLowerCase().includes("pizza") ? "Italian" :
             title.toLowerCase().includes("wrap") ? "Fusion" : "Family",
    kcalPerServing: kcal,
    mealType,
    ingredients,
    kidsMenu: kidsEntry,
    steps: [
      "Prep all ingredients and set out seasonings.",
      "Follow your preferred cooking method for this dish.",
      "Season to taste and serve hot. Add extra spice to adult portions if desired."
    ],
    note: "",
    image: getImage(title)
  };
}

// ====== 4-WEEK MEAL PLAN (from Excel) ======
const FOUR_WEEK_PLAN = [
  // WEEK 1 — Jollof Rice
  {
    weekLabel: "Week 1 — Jollof Rice",
    days: [
      { name: "Monday",    breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("Jollof rice & chicken", "lunch"),    dinner: makeMeal("Salmon & stir-fry veggies", "dinner") },
      { name: "Tuesday",   breakfast: makeMeal("Cereal", "breakfast"),          lunch: makeMeal("Chicken salad", "lunch"),             dinner: makeMeal("Beef pepper soup", "dinner") },
      { name: "Wednesday", breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("Rice & chicken stir-fry", "lunch"),  dinner: makeMeal("Grilled fish & veggies", "dinner") },
      { name: "Thursday",  breakfast: makeMeal("Cereal", "breakfast"),          lunch: makeMeal("Jollof rice & fish", "lunch"),       dinner: makeMeal("Pasta & shrimp", "dinner") },
      { name: "Friday",    breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("Healthy tuna wrap", "lunch"),        dinner: makeMeal("Pizza", "dinner") },
      { name: "Saturday",  breakfast: makeMeal("Pancakes & eggs", "breakfast"), lunch: makeMeal("Puff puff / samosa", "lunch"),      dinner: makeMeal("Leftover pasta & shrimp", "dinner") },
      { name: "Sunday",    breakfast: makeMeal("Bread & egg", "breakfast"),     lunch: makeMeal("Light veggie bowl", "lunch"),        dinner: makeMeal("Eba & Egusi", "dinner") },
    ]
  },
  // WEEK 2 — Fried Rice
  {
    weekLabel: "Week 2 — Fried Rice",
    days: [
      { name: "Monday",    breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("Fried rice & chicken", "lunch"),     dinner: makeMeal("Salmon & stir-fry veggies", "dinner") },
      { name: "Tuesday",   breakfast: makeMeal("Cereal", "breakfast"),          lunch: makeMeal("Shrimp salad", "lunch"),             dinner: makeMeal("Chicken pepper soup", "dinner") },
      { name: "Wednesday", breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("Rice & chicken stir-fry", "lunch"),  dinner: makeMeal("Grilled fish & veggies", "dinner") },
      { name: "Thursday",  breakfast: makeMeal("Cereal", "breakfast"),          lunch: makeMeal("Fried rice & shrimp", "lunch"),      dinner: makeMeal("Pasta & chicken", "dinner") },
      { name: "Friday",    breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("Healthy veggie wrap", "lunch"),      dinner: makeMeal("Pasta (special)", "dinner") },
      { name: "Saturday",  breakfast: makeMeal("Yam & egg", "breakfast"),       lunch: makeMeal("Meat pie / sausage roll", "lunch"),  dinner: makeMeal("Leftover pasta", "dinner") },
      { name: "Sunday",    breakfast: makeMeal("Pancakes & eggs", "breakfast"), lunch: makeMeal("Light salad & grilled fish", "lunch"), dinner: makeMeal("Beef pepper soup", "dinner") },
    ]
  },
  // WEEK 3 — White Rice
  {
    weekLabel: "Week 3 — White Rice",
    days: [
      { name: "Monday",    breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("White rice & chicken stew", "lunch"), dinner: makeMeal("Salmon & stir-fry veggies", "dinner") },
      { name: "Tuesday",   breakfast: makeMeal("Cereal", "breakfast"),          lunch: makeMeal("Beef salad", "lunch"),                dinner: makeMeal("Chicken pepper soup", "dinner") },
      { name: "Wednesday", breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("Rice & chicken stir-fry", "lunch"),  dinner: makeMeal("Grilled fish & veggies", "dinner") },
      { name: "Thursday",  breakfast: makeMeal("Cereal", "breakfast"),          lunch: makeMeal("White rice & grilled fish", "lunch"), dinner: makeMeal("Pasta & shrimp", "dinner") },
      { name: "Friday",    breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("Healthy tuna wrap", "lunch"),         dinner: makeMeal("Grilled chicken + veggies & potatoes", "dinner") },
      { name: "Saturday",  breakfast: makeMeal("Pancakes & eggs", "breakfast"), lunch: makeMeal("Puff puff / samosa", "lunch"),       dinner: makeMeal("Leftover pasta & shrimp", "dinner") },
      { name: "Sunday",    breakfast: makeMeal("Bread & egg", "breakfast"),     lunch: makeMeal("Light veggie bowl", "lunch"),         dinner: makeMeal("Eba & Okra", "dinner") },
    ]
  },
  // WEEK 4 — White Rice & Beans
  {
    weekLabel: "Week 4 — White Rice & Beans",
    days: [
      { name: "Monday",    breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("White rice & beans", "lunch"),           dinner: makeMeal("Salmon & stir-fry veggies", "dinner") },
      { name: "Tuesday",   breakfast: makeMeal("Cereal", "breakfast"),          lunch: makeMeal("Chicken salad", "lunch"),                 dinner: makeMeal("Beef pepper soup", "dinner") },
      { name: "Wednesday", breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("Rice & chicken stir-fry", "lunch"),      dinner: makeMeal("Grilled fish & veggies", "dinner") },
      { name: "Thursday",  breakfast: makeMeal("Cereal", "breakfast"),          lunch: makeMeal("White rice & beans + plantain", "lunch"), dinner: makeMeal("Pasta & chicken", "dinner") },
      { name: "Friday",    breakfast: makeMeal("Sandwich", "breakfast"),       lunch: makeMeal("Healthy veggie wrap", "lunch"),           dinner: makeMeal("Rice & beef stir-fry", "dinner") },
      { name: "Saturday",  breakfast: makeMeal("Yam & egg", "breakfast"),       lunch: makeMeal("Meat pie / sausage roll", "lunch"),       dinner: makeMeal("Leftover pasta & chicken", "dinner") },
      { name: "Sunday",    breakfast: makeMeal("Pancakes & eggs", "breakfast"), lunch: makeMeal("Light salad & grilled chicken", "lunch"), dinner: makeMeal("Chicken pepper soup", "dinner") },
    ]
  }
];
