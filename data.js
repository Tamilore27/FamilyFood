// ===== data.js =====
// Replace meal names with your real Excel values

const MEAL_DATA = [
  // ===== WEEK 1 =====
  { week: 1, day: "Mon", breakfast: "French Toast + Fruit", lunch: "Chicken Shawarma Wraps", dinner: "Egusi Soup + Rice", kidsLunch: "Sandwich + Apple" },
  { week: 1, day: "Tue", breakfast: "Oatmeal + Banana", lunch: "Turkey Sandwich", dinner: "Spaghetti Bolognese", kidsLunch: "Pizza Slice" },
  { week: 1, day: "Wed", breakfast: "Scrambled Eggs + Toast", lunch: "Tuna Wrap", dinner: "Salmon + Potatoes", kidsLunch: "Mac & Cheese" },
  { week: 1, day: "Thu", breakfast: "Yogurt Parfait", lunch: "Chicken Salad", dinner: "Jollof Rice + Chicken", kidsLunch: "Hotdog" },
  { week: 1, day: "Fri", breakfast: "Pancakes + Berries", lunch: "Leftovers", dinner: "Stir Fry", kidsLunch: "Grilled Cheese" },
  { week: 1, day: "Sat", breakfast: "Toast + Eggs", lunch: "Shawarma", dinner: "Pizza Night", kidsLunch: "Nuggets" },
  { week: 1, day: "Sun", breakfast: "Cereal + Milk", lunch: "Rice + Beans", dinner: "Stew + Rice", kidsLunch: "Leftovers" },

  // ===== WEEK 2 =====
  { week: 2, day: "Mon", breakfast: "Oatmeal + Fruit", lunch: "Chicken Wrap", dinner: "Egusi Soup + Rice", kidsLunch: "Sandwich" },
  { week: 2, day: "Tue", breakfast: "French Toast", lunch: "Tuna Sandwich", dinner: "Spaghetti", kidsLunch: "Pizza" },
  { week: 2, day: "Wed", breakfast: "Eggs + Toast", lunch: "Chicken Salad", dinner: "Jollof Rice", kidsLunch: "Mac & Cheese" },
  { week: 2, day: "Thu", breakfast: "Yogurt + Granola", lunch: "Leftovers", dinner: "Salmon + Veggies", kidsLunch: "Hotdog" },
  { week: 2, day: "Fri", breakfast: "Pancakes", lunch: "Wrap", dinner: "Stir Fry", kidsLunch: "Grilled Cheese" },
  { week: 2, day: "Sat", breakfast: "Toast + Eggs", lunch: "Shawarma", dinner: "Pizza", kidsLunch: "Nuggets" },
  { week: 2, day: "Sun", breakfast: "Cereal", lunch: "Rice + Beans", dinner: "Stew", kidsLunch: "Leftovers" },

  // Add Week 3 & 4 same way
];

// Lookup tables (edit anytime)
const INGREDIENTS = {
  "French Toast + Fruit": ["Bread", "Eggs", "Milk", "Banana"],
  "Egusi Soup + Rice": ["Egusi", "Palm oil", "Rice", "Onions"],
  "Chicken Shawarma Wraps": ["Chicken", "Wraps", "Lettuce", "Tomato"],
};

const CALORIES = {
  "French Toast + Fruit": 550,
  "Chicken Shawarma Wraps": 650,
  "Egusi Soup + Rice": 800,
};
