// Grocery Data
export const groceryCategories = [
  "Baking & Cooking Materials",
  "Meal-Prepped Goods",
  "Snacks",
  "Proteins",
  "Produce",
  "Dairy & Eggs",
  "Pantry Staples",
  "Bakery & Bread",
  "Beverages",
  "Breakfast",
  "Frozen Foods",
  "Condiments & Sauces",
  "Canned & Packaged Goods"
];

export type Grocery = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  dietaryTags: string[];
  description: string;
};

export const groceries: Grocery[] = [
  // Baking & Cooking Materials
  {
    id: "1",
    name: "All-Purpose Flour",
    category: "Baking & Cooking Materials",
    price: 4.99,
    image: "🌾",
    dietaryTags: ["gluten", "wheat"],
    description: "5 lb bag of premium all-purpose flour",
  },
  {
    id: "2",
    name: "Almond Flour",
    category: "Baking & Cooking Materials",
    price: 9.99,
    image: "🌰",
    dietaryTags: ["tree-nut", "gluten-free", "keto"],
    description: "Gluten-free almond flour for baking",
  },
  {
    id: "3",
    name: "Coconut Oil",
    category: "Baking & Cooking Materials",
    price: 12.99,
    image: "🥥",
    dietaryTags: ["vegan", "paleo", "keto"],
    description: "Organic virgin coconut oil",
  },
  {
    id: "4",
    name: "Olive Oil",
    category: "Baking & Cooking Materials",
    price: 14.99,
    image: "🫒",
    dietaryTags: ["vegan", "paleo", "mediterranean"],
    description: "Extra virgin olive oil",
  },
  {
    id: "5",
    name: "Baking Soda",
    category: "Baking & Cooking Materials",
    price: 2.99,
    image: "🧂",
    dietaryTags: ["vegan"],
    description: "Aluminum-free baking soda",
  },
  {
    id: "6",
    name: "Honey",
    category: "Baking & Cooking Materials",
    price: 8.99,
    image: "🍯",
    dietaryTags: ["vegetarian"],
    description: "Raw organic honey",
  },

  // Meal-Prepped Goods
  {
    id: "7",
    name: "Grilled Chicken Breast",
    category: "Meal-Prepped Goods",
    price: 7.99,
    image: "🍗",
    dietaryTags: ["high-protein", "low-carb", "paleo"],
    description: "Pre-cooked grilled chicken breast, 12 oz",
  },
  {
    id: "8",
    name: "Brown Rice & Roasted Vegetables",
    category: "Meal-Prepped Goods",
    price: 5.99,
    image: "🍚",
    dietaryTags: ["vegan", "gluten-free"],
    description: "Ready-to-eat brown rice with seasonal vegetables",
  },
  {
    id: "9",
    name: "Quinoa Buddha Bowl",
    category: "Meal-Prepped Goods",
    price: 8.49,
    image: "🥣",
    dietaryTags: ["vegan", "gluten-free", "high-protein"],
    description: "Quinoa with hummus, cucumber, tomato, and tahini",
  },
  {
    id: "10",
    name: "Salmon Fillet with Asparagus",
    category: "Meal-Prepped Goods",
    price: 11.99,
    image: "🐟",
    dietaryTags: ["fish", "high-protein", "paleo"],
    description: "Baked salmon with roasted asparagus",
  },
  {
    id: "11",
    name: "Vegetarian Curry",
    category: "Meal-Prepped Goods",
    price: 6.99,
    image: "🍛",
    dietaryTags: ["vegetarian", "vegan"],
    description: "Chickpea and spinach curry with rice",
  },

  // Snacks
  {
    id: "12",
    name: "Almonds",
    category: "Snacks",
    price: 9.99,
    image: "🌰",
    dietaryTags: ["tree-nut", "vegan", "paleo", "keto"],
    description: "Roasted unsalted almonds, 1 lb",
  },
  {
    id: "13",
    name: "Granola Bars",
    category: "Snacks",
    price: 4.99,
    image: "🍫",
    dietaryTags: ["vegetarian", "gluten-free"],
    description: "Box of 6 low-sugar granola bars",
  },
  {
    id: "14",
    name: "Protein Powder",
    category: "Snacks",
    price: 29.99,
    image: "💪",
    dietaryTags: ["high-protein", "keto"],
    description: "Vanilla whey protein powder, 20 servings",
  },
  {
    id: "15",
    name: "Hummus & Veggie Pack",
    category: "Snacks",
    price: 5.49,
    image: "🥕",
    dietaryTags: ["vegan", "gluten-free"],
    description: "Roasted red pepper hummus with carrot and celery",
  },
  {
    id: "16",
    name: "Dark Chocolate",
    category: "Snacks",
    price: 3.99,
    image: "🍫",
    dietaryTags: ["vegetarian", "vegan"],
    description: "85% dark chocolate bar",
  },

  // Proteins
  {
    id: "17",
    name: "Ground Turkey",
    category: "Proteins",
    price: 8.99,
    image: "🦃",
    dietaryTags: ["high-protein", "paleo", "low-carb"],
    description: "Lean ground turkey, 1 lb",
  },
  {
    id: "18",
    name: "Greek Yogurt",
    category: "Proteins",
    price: 5.99,
    image: "🥛",
    dietaryTags: ["dairy", "high-protein", "gluten-free"],
    description: "Plain non-fat Greek yogurt, 32 oz",
  },
  {
    id: "19",
    name: "Tofu",
    category: "Proteins",
    price: 3.49,
    image: "⬜",
    dietaryTags: ["vegan", "soy", "gluten-free"],
    description: "Extra firm tofu, organic",
  },
  {
    id: "20",
    name: "Eggs (Dozen)",
    category: "Proteins",
    price: 4.99,
    image: "🥚",
    dietaryTags: ["egg", "high-protein", "paleo"],
    description: "Free-range brown eggs",
  },

  // Produce
  {
    id: "21",
    name: "Organic Spinach",
    category: "Produce",
    price: 3.99,
    image: "🥬",
    dietaryTags: ["vegan", "gluten-free", "paleo"],
    description: "Fresh organic baby spinach",
  },
  {
    id: "22",
    name: "Broccoli",
    category: "Produce",
    price: 2.99,
    image: "🥦",
    dietaryTags: ["vegan", "gluten-free"],
    description: "Fresh broccoli crowns",
  },
  {
    id: "23",
    name: "Berries Mix",
    category: "Produce",
    price: 5.99,
    image: "🫐",
    dietaryTags: ["vegan", "gluten-free", "paleo"],
    description: "Organic mixed berries, 1 lb",
  },
  {
    id: "24",
    name: "Bananas",
    category: "Produce",
    price: 1.49,
    image: "🍌",
    dietaryTags: ["vegan", "gluten-free"],
    description: "Bunch of 5 bananas",
  },

  // Dairy & Eggs
  {
    id: "25",
    name: "Cheddar Cheese",
    category: "Dairy & Eggs",
    price: 6.99,
    image: "🧀",
    dietaryTags: ["dairy", "vegetarian", "gluten-free"],
    description: "Sharp cheddar cheese block, 8 oz",
  },
  {
    id: "26",
    name: "Almond Milk",
    category: "Dairy & Eggs",
    price: 3.49,
    image: "🥛",
    dietaryTags: ["vegan", "tree-nut", "gluten-free"],
    description: "Unsweetened almond milk, 64 oz",
  },

  // Pantry Staples
  {
    id: "27",
    name: "Brown Rice",
    category: "Pantry Staples",
    price: 3.99,
    image: "🍚",
    dietaryTags: ["vegan", "gluten-free"],
    description: "Organic brown rice, 2 lb",
  },
  {
    id: "28",
    name: "Canned Chickpeas",
    category: "Pantry Staples",
    price: 1.99,
    image: "🫘",
    dietaryTags: ["vegan", "gluten-free", "high-protein"],
    description: "Organic canned chickpeas, 15 oz",
  },
];

// Recipe Data
export type Recipe = {
  id: string;
  name: string;
  image: string;
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  dietaryTags: string[];
  ingredients: string[];
  description: string;
};

export const recipes: Recipe[] = [
  {
    id: "r1",
    name: "Grilled Chicken with Roasted Vegetables",
    image: "🍗",
    cookTime: 30,
    servings: 4,
    difficulty: "Easy",
    dietaryTags: ["paleo", "keto", "high-protein", "gluten-free"],
    ingredients: ["Chicken breast", "Broccoli", "Bell peppers", "Olive oil"],
    description: "Simple and delicious grilled chicken with seasonal vegetables",
  },
  {
    id: "r2",
    name: "Quinoa Buddha Bowl",
    image: "🥣",
    cookTime: 20,
    servings: 2,
    difficulty: "Easy",
    dietaryTags: ["vegan", "vegetarian", "gluten-free"],
    ingredients: [
      "Quinoa",
      "Chickpeas",
      "Spinach",
      "Avocado",
      "Tahini",
      "Lemon",
    ],
    description: "Nutritious and colorful bowl packed with plant-based protein",
  },
  {
    id: "r3",
    name: "Salmon with Asparagus",
    image: "🐟",
    cookTime: 25,
    servings: 2,
    difficulty: "Easy",
    dietaryTags: ["fish", "paleo", "high-protein", "gluten-free"],
    ingredients: ["Salmon fillet", "Asparagus", "Lemon", "Garlic", "Olive oil"],
    description: "Omega-3 rich salmon with tender roasted asparagus",
  },
  {
    id: "r4",
    name: "Veggie Stir Fry",
    image: "🥦",
    cookTime: 20,
    servings: 3,
    difficulty: "Easy",
    dietaryTags: ["vegan", "vegetarian", "gluten-free"],
    ingredients: [
      "Broccoli",
      "Bell peppers",
      "Snap peas",
      "Soy sauce",
      "Ginger",
      "Garlic",
    ],
    description: "Quick and colorful vegetable stir fry with ginger and garlic",
  },
  {
    id: "r5",
    name: "Almond Flour Pancakes",
    image: "🥞",
    cookTime: 20,
    servings: 2,
    difficulty: "Easy",
    dietaryTags: ["keto", "gluten-free", "tree-nut"],
    ingredients: ["Almond flour", "Eggs", "Honey", "Vanilla"],
    description: "Low-carb and gluten-free pancakes perfect for breakfast",
  },
  {
    id: "r6",
    name: "Mediterranean Chickpea Salad",
    image: "🥗",
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    dietaryTags: ["vegan", "vegetarian", "mediterranean", "gluten-free"],
    ingredients: [
      "Chickpeas",
      "Cucumber",
      "Tomato",
      "Red onion",
      "Feta",
      "Olive oil",
    ],
    description: "Fresh and healthy salad with a Mediterranean twist",
  },
  {
    id: "r7",
    name: "Thai Coconut Curry",
    image: "🍛",
    cookTime: 35,
    servings: 4,
    difficulty: "Medium",
    dietaryTags: ["vegan", "vegetarian", "gluten-free"],
    ingredients: [
      "Coconut milk",
      "Curry paste",
      "Vegetables",
      "Tofu",
      "Lime",
      "Rice",
    ],
    description: "Creamy and aromatic Thai curry with vegetables",
  },
  {
    id: "r8",
    name: "Protein Energy Balls",
    image: "🍫",
    cookTime: 15,
    servings: 12,
    difficulty: "Easy",
    dietaryTags: ["vegan", "vegetarian", "keto"],
    ingredients: ["Protein powder", "Almond butter", "Dark chocolate", "Oats"],
    description: "No-bake energy balls perfect for a quick snack",
  },
  {
    id: "r9",
    name: "Zucchini Noodles with Pesto",
    image: "🍝",
    cookTime: 20,
    servings: 2,
    difficulty: "Easy",
    dietaryTags: ["vegan", "vegetarian", "gluten-free", "low-carb"],
    ingredients: ["Zucchini", "Basil", "Garlic", "Olive oil", "Pine nuts"],
    description: "Light and healthy spiralized zucchini with fresh pesto",
  },
  {
    id: "r10",
    name: "Slow Cooker Vegetable Soup",
    image: "🍲",
    cookTime: 480,
    servings: 6,
    difficulty: "Easy",
    dietaryTags: ["vegan", "vegetarian", "gluten-free"],
    ingredients: [
      "Mixed vegetables",
      "Vegetable broth",
      "Tomatoes",
      "Beans",
      "Herbs",
    ],
    description: "Hearty and comforting vegetable soup made in a slow cooker",
  },
];

// Dining Data
export const diningCategories = [
  "College Campuses",
  "Bakeries",
  "Cafes",
  "Fine Dining",
  "Casual",
  "Food Trucks",
  "Ethnic Cuisine",
];

export type DiningArea = {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  dietaryTags: string[];
  address: string;
  description: string;
  hours: string;
};

export const diningAreas: DiningArea[] = [
  // College Campuses
  {
    id: "d1",
    name: "Campus Dining Hall",
    category: "College Campuses",
    image: "🏫",
    rating: 4.0,
    dietaryTags: ["vegetarian", "vegan", "gluten-free"],
    address: "123 University Ave",
    description:
      "Main dining hall with diverse menu options and dietary accommodations",
    hours: "7 AM - 9 PM",
  },
  {
    id: "d2",
    name: "Student Center Cafe",
    category: "College Campuses",
    image: "☕",
    rating: 4.2,
    dietaryTags: ["gluten-free", "vegetarian"],
    address: "456 College Way",
    description: "Casual cafe with sandwiches, salads, and coffee",
    hours: "8 AM - 10 PM",
  },

  // Bakeries
  {
    id: "d3",
    name: "Artisan Bakery",
    category: "Bakeries",
    image: "🥐",
    rating: 4.8,
    dietaryTags: ["vegetarian"],
    address: "789 Main St",
    description: "Fresh-baked pastries and bread made daily",
    hours: "7 AM - 6 PM",
  },
  {
    id: "d4",
    name: "Gluten-Free Bakery",
    category: "Bakeries",
    image: "🍞",
    rating: 4.6,
    dietaryTags: ["gluten-free", "vegetarian", "vegan"],
    address: "321 Oak Rd",
    description: "Specialty bakery with gluten-free and vegan options",
    hours: "8 AM - 5 PM",
  },

  // Cafes
  {
    id: "d5",
    name: "Morning Brew Coffee",
    category: "Cafes",
    image: "☕",
    rating: 4.5,
    dietaryTags: ["vegan", "vegetarian"],
    address: "555 Riverside Dr",
    description: "Cozy coffee shop with pastries and light snacks",
    hours: "6 AM - 8 PM",
  },
  {
    id: "d6",
    name: "The Green Leaf Cafe",
    category: "Cafes",
    image: "🌿",
    rating: 4.7,
    dietaryTags: ["vegan", "vegetarian", "gluten-free"],
    address: "888 Green St",
    description: "Organic cafe focusing on sustainable and healthy options",
    hours: "7 AM - 9 PM",
  },

  // Fine Dining
  {
    id: "d7",
    name: "Elegant Table",
    category: "Fine Dining",
    image: "🍽️",
    rating: 4.9,
    dietaryTags: ["pescatarian", "gluten-free"],
    address: "999 Fine Ave",
    description: "Upscale restaurant with chef-curated menu",
    hours: "5 PM - 11 PM",
  },
  {
    id: "d8",
    name: "Seasonal Kitchen",
    category: "Fine Dining",
    image: "👨‍🍳",
    rating: 4.8,
    dietaryTags: ["vegan", "vegetarian", "paleo"],
    address: "202 Chef Ln",
    description: "Fine dining with locally sourced ingredients",
    hours: "6 PM - 10 PM",
  },

  // Casual
  {
    id: "d9",
    name: "The Burger Spot",
    category: "Casual",
    image: "🍔",
    rating: 4.3,
    dietaryTags: ["high-protein"],
    address: "333 Casual Way",
    description: "Casual burger restaurant with customizable options",
    hours: "11 AM - 10 PM",
  },
  {
    id: "d10",
    name: "Pizza Paradise",
    category: "Casual",
    image: "🍕",
    rating: 4.4,
    dietaryTags: ["vegetarian", "vegan"],
    address: "444 Pizza Rd",
    description: "Casual pizzeria with wood-fired oven",
    hours: "11 AM - 11 PM",
  },

  // Food Trucks
  {
    id: "d11",
    name: "Taco on Wheels",
    category: "Food Trucks",
    image: "🌮",
    rating: 4.6,
    dietaryTags: ["vegetarian", "gluten-free"],
    address: "Downtown Area",
    description: "Mexican food truck with fresh ingredients",
    hours: "11 AM - 9 PM",
  },
  {
    id: "d12",
    name: "Poke Express",
    category: "Food Trucks",
    image: "🍙",
    rating: 4.5,
    dietaryTags: ["fish", "high-protein"],
    address: "Park Street",
    description: "Fresh poke bowls and sushi from a food truck",
    hours: "12 PM - 9 PM",
  },

  // Ethnic Cuisine
  {
    id: "d13",
    name: "Thai Garden",
    category: "Ethnic Cuisine",
    image: "🍛",
    rating: 4.7,
    dietaryTags: ["vegan", "vegetarian", "gluten-free"],
    address: "555 Exotic St",
    description: "Authentic Thai cuisine with vegetarian options",
    hours: "11 AM - 10 PM",
  },
  {
    id: "d14",
    name: "Mediterranean Mediterranean",
    category: "Ethnic Cuisine",
    image: "🫒",
    rating: 4.6,
    dietaryTags: ["mediterranean", "vegan", "vegetarian"],
    address: "666 Mediterranean Ave",
    description: "Mediterranean cuisine with fresh seafood and vegetables",
    hours: "12 PM - 10 PM",
  },
];
