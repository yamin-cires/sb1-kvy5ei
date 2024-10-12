export interface Variant {
  id: number;
  name: string;
  price: number;
}export interface Variant {
  id: number;
  name: string;
  price: number;
}

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  variants: Variant[];
}

const allFoodItems: FoodItem[] = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=300&fit=crop',
    category: 'Pizza',
    price: 9.99,
    variants: [
      { id: 1, name: 'Size Small', price: 0 },
      { id: 2, name: 'Size Medium', price: 3 },
      { id: 3, name: 'Size Large', price: 6 },
      { id: 4, name: 'Crust Regular', price: 0 },
      { id: 5, name: 'Crust Thin', price: 1 },
      { id: 6, name: 'Crust Stuffed', price: 2 },
    ],
  },
  {
    id: 2,
    name: 'Cheeseburger',
    description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
    category: 'Burger',
    price: 8.99,
    variants: [
      { id: 7, name: 'Size Single', price: 0 },
      { id: 8, name: 'Size Double', price: 3 },
      { id: 9, name: 'Size Triple', price: 6 },
      { id: 10, name: 'Side Fries', price: 2.99 },
      { id: 11, name: 'Side Onion Rings', price: 3.99 },
      { id: 12, name: 'Drink Soda', price: 1.99 },
      { id: 13, name: 'Drink Milkshake', price: 3.99 },
    ],
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, croutons, parmesan cheese, and Caesar dressing',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&h=300&fit=crop',
    category: 'Salad',
    price: 6.99,
    variants: [
      { id: 14, name: 'Size Small', price: 0 },
      { id: 15, name: 'Size Large', price: 3 },
      { id: 16, name: 'Protein Chicken', price: 2.99 },
      { id: 17, name: 'Protein Shrimp', price: 3.99 },
      { id: 18, name: 'Dressing Regular', price: 0 },
      { id: 19, name: 'Dressing Light', price: 0 },
    ],
  },
  {
    id: 4,
    name: 'Pepperoni Pizza',
    description: 'Classic pizza topped with spicy pepperoni slices',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=300&fit=crop',
    category: 'Pizza',
    price: 11.99,
    variants: [
      { id: 20, name: 'Size Small', price: 0 },
      { id: 21, name: 'Size Medium', price: 3 },
      { id: 22, name: 'Size Large', price: 6 },
      { id: 23, name: 'Crust Regular', price: 0 },
      { id: 24, name: 'Crust Thin', price: 1 },
      { id: 25, name: 'Crust Stuffed', price: 2 },
    ],
  },
  {
    id: 5,
    name: 'Veggie Burger',
    description: 'Plant-based patty with lettuce, tomato, and vegan mayo',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&h=300&fit=crop',
    category: 'Burger',
    price: 9.99,
    variants: [
      { id: 26, name: 'Size Single', price: 0 },
      { id: 27, name: 'Size Double', price: 3 },
      { id: 28, name: 'Side Fries', price: 2.99 },
      { id: 29, name: 'Side Sweet Potato Fries', price: 3.99 },
      { id: 30, name: 'Drink Soda', price: 1.99 },
      { id: 31, name: 'Drink Lemonade', price: 2.49 },
    ],
  },
  {
    id: 6,
    name: 'Greek Salad',
    description: 'Fresh salad with feta cheese, olives, tomatoes, and cucumber',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=300&fit=crop',
    category: 'Salad',
    price: 7.99,
    variants: [
      { id: 32, name: 'Size Small', price: 0 },
      { id: 33, name: 'Size Large', price: 3 },
      { id: 34, name: 'Protein Grilled Chicken', price: 2.99 },
      { id: 35, name: 'Protein Falafel', price: 2.49 },
      { id: 36, name: 'Dressing Greek', price: 0 },
      { id: 37, name: 'Dressing Balsamic', price: 0 },
    ],
  },
  {
    id: 7,
    name: 'BBQ Chicken Pizza',
    description: 'Tangy BBQ sauce, grilled chicken, red onions, and cilantro',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=300&fit=crop',
    category: 'Pizza',
    price: 12.99,
    variants: [
      { id: 38, name: 'Size Small', price: 0 },
      { id: 39, name: 'Size Medium', price: 3 },
      { id: 40, name: 'Size Large', price: 6 },
      { id: 41, name: 'Crust Regular', price: 0 },
      { id: 42, name: 'Crust Thin', price: 1 },
      { id: 43, name: 'Crust Stuffed', price: 2 },
    ],
  },
  {
    id: 8,
    name: 'Mushroom Swiss Burger',
    description: 'Beef patty topped with sautéed mushrooms and Swiss cheese',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&h=300&fit=crop',
    category: 'Burger',
    price: 10.99,
    variants: [
      { id: 44, name: 'Size Single', price: 0 },
      { id: 45, name: 'Size Double', price: 3 },
      { id: 46, name: 'Side Fries', price: 2.99 },
      { id: 47, name: 'Side Onion Rings', price: 3.99 },
      { id: 48, name: 'Drink Soda', price: 1.99 },
      { id: 49, name: 'Drink Iced Tea', price: 2.49 },
    ],
  },
];

export const categories = [
  'Pizza', 
  'Burger', 
  'Salad', 
  'Pasta', 
  'Sushi', 
  'Dessert', 
  'Drinks', 
  'Sandwich', 
  'Breakfast', 
  'Mexican'
];

export async function getFoodItems(page: number, pageSize: number, category?: string): Promise<{ items: FoodItem[], totalItems: number }> {
  let filteredItems = category
    ? allFoodItems.filter(item => item.category === category)
    : allFoodItems;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: paginatedItems,
        totalItems: filteredItems.length,
      });
    }, 500); // Simulate network delay
  });
}