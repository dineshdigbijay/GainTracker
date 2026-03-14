// User profile - can be updated in settings
export const USER_PROFILE = {
  weight: 45, // kg
  height: 167, // cm (5.5ft)
  age: 22,
  gender: 'male',
  activityLevel: 1.2, // sedentary
  goal: 'aggressive_bulk'
};

// Calorie calculation
// BMR (Mifflin-St Jeor): 10*W + 6.25*H - 5*A + 5
// BMR = 10*45 + 6.25*167 - 5*22 + 5 = 450 + 1043.75 - 110 + 5 = 1388.75
// TDEE = 1388.75 * 1.2 = 1666.5
// Aggressive bulk = TDEE + 600 = ~2267 → we target 3200 to be safe for a hardgainer
export const DAILY_TARGETS = {
  calories: 3200,
  protein: 160, // g — 3.5g/kg bodyweight
  carbs: 430,   // g
  fat: 90,      // g
};

// 5-day PPL + arms split for beginner
export const WORKOUT_PLAN = [
  {
    day: 'Monday',
    name: 'Push',
    focus: 'Chest · Shoulders · Triceps',
    color: '#ff4d4d',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10', muscle: 'Chest' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', muscle: 'Chest' },
      { name: 'Overhead Press', sets: 4, reps: '8-10', muscle: 'Shoulders' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', muscle: 'Shoulders' },
      { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', muscle: 'Triceps' },
      { name: 'Overhead Tricep Extension', sets: 3, reps: '12-15', muscle: 'Triceps' },
    ]
  },
  {
    day: 'Tuesday',
    name: 'Pull',
    focus: 'Back · Biceps · Rear Delts',
    color: '#4d9fff',
    exercises: [
      { name: 'Deadlift', sets: 4, reps: '5-6', muscle: 'Back' },
      { name: 'Barbell Row', sets: 4, reps: '8-10', muscle: 'Back' },
      { name: 'Lat Pulldown', sets: 3, reps: '10-12', muscle: 'Back' },
      { name: 'Face Pulls', sets: 3, reps: '15-20', muscle: 'Rear Delts' },
      { name: 'Barbell Curl', sets: 3, reps: '10-12', muscle: 'Biceps' },
      { name: 'Hammer Curl', sets: 3, reps: '12-15', muscle: 'Biceps' },
    ]
  },
  {
    day: 'Wednesday',
    name: 'Legs',
    focus: 'Quads · Hamstrings · Calves',
    color: '#ffd700',
    exercises: [
      { name: 'Squat', sets: 4, reps: '8-10', muscle: 'Quads' },
      { name: 'Leg Press', sets: 4, reps: '10-12', muscle: 'Quads' },
      { name: 'Romanian Deadlift', sets: 3, reps: '10-12', muscle: 'Hamstrings' },
      { name: 'Leg Curl', sets: 3, reps: '12-15', muscle: 'Hamstrings' },
      { name: 'Calf Raises', sets: 4, reps: '15-20', muscle: 'Calves' },
    ]
  },
  {
    day: 'Thursday',
    name: 'Rest',
    focus: 'Recovery · Eat Big',
    color: '#888',
    exercises: []
  },
  {
    day: 'Friday',
    name: 'Push',
    focus: 'Chest · Shoulders · Triceps',
    color: '#ff4d4d',
    exercises: [
      { name: 'Incline Barbell Press', sets: 4, reps: '8-10', muscle: 'Chest' },
      { name: 'Cable Fly', sets: 3, reps: '12-15', muscle: 'Chest' },
      { name: 'Arnold Press', sets: 3, reps: '10-12', muscle: 'Shoulders' },
      { name: 'Cable Lateral Raises', sets: 3, reps: '12-15', muscle: 'Shoulders' },
      { name: 'Skull Crushers', sets: 3, reps: '10-12', muscle: 'Triceps' },
      { name: 'Dips', sets: 3, reps: '10-12', muscle: 'Triceps' },
    ]
  },
  {
    day: 'Saturday',
    name: 'Pull',
    focus: 'Back · Biceps',
    color: '#4d9fff',
    exercises: [
      { name: 'Pull-ups / Assisted', sets: 4, reps: '6-10', muscle: 'Back' },
      { name: 'Seated Cable Row', sets: 4, reps: '10-12', muscle: 'Back' },
      { name: 'Single Arm Dumbbell Row', sets: 3, reps: '10-12', muscle: 'Back' },
      { name: 'Rope Hammer Curl', sets: 3, reps: '12-15', muscle: 'Biceps' },
      { name: 'Concentration Curl', sets: 3, reps: '12-15', muscle: 'Biceps' },
    ]
  },
  {
    day: 'Sunday',
    name: 'Rest',
    focus: 'Full Rest · Prep Week',
    color: '#888',
    exercises: []
  }
];

// Bulking meal suggestions (no beef)
export const MEAL_SUGGESTIONS = [
  // Breakfast
  { name: 'Oats with Banana & Peanut Butter', meal: 'breakfast', calories: 620, protein: 22, carbs: 85, fat: 20, tags: ['easy', 'cheap'] },
  { name: 'Whole Eggs Scrambled (4) + Toast', meal: 'breakfast', calories: 540, protein: 28, carbs: 38, fat: 28, tags: ['easy', 'quick'] },
  { name: 'Greek Yogurt Bowl + Granola + Honey', meal: 'breakfast', calories: 480, protein: 24, carbs: 62, fat: 12, tags: ['easy'] },
  { name: 'Peanut Butter Banana Shake', meal: 'breakfast', calories: 720, protein: 30, carbs: 80, fat: 28, tags: ['quick', 'liquid'] },
  { name: 'Chicken Omelette (3 eggs)', meal: 'breakfast', calories: 490, protein: 38, carbs: 8, fat: 22, tags: ['high-protein'] },
  // Lunch
  { name: 'Chicken Rice Bowl', meal: 'lunch', calories: 750, protein: 52, carbs: 80, fat: 18, tags: ['staple', 'high-protein'] },
  { name: 'Tuna Pasta', meal: 'lunch', calories: 680, protein: 46, carbs: 78, fat: 14, tags: ['cheap', 'easy'] },
  { name: 'Mutton Curry + Rice', meal: 'lunch', calories: 820, protein: 48, carbs: 72, fat: 28, tags: ['heavy', 'desi'] },
  { name: 'Egg Fried Rice', meal: 'lunch', calories: 650, protein: 30, carbs: 88, fat: 18, tags: ['easy', 'cheap'] },
  { name: 'Salmon with Sweet Potato', meal: 'lunch', calories: 720, protein: 50, carbs: 58, fat: 22, tags: ['clean', 'high-protein'] },
  // Dinner
  { name: 'Grilled Chicken + Chapati (3)', meal: 'dinner', calories: 700, protein: 52, carbs: 68, fat: 16, tags: ['staple', 'desi'] },
  { name: 'Paneer Bhurji + Rice', meal: 'dinner', calories: 780, protein: 38, carbs: 75, fat: 30, tags: ['vegetarian-friendly', 'desi'] },
  { name: 'Shrimp Stir Fry + Noodles', meal: 'dinner', calories: 620, protein: 42, carbs: 72, fat: 14, tags: ['quick'] },
  { name: 'Chicken Biryani', meal: 'dinner', calories: 900, protein: 54, carbs: 95, fat: 28, tags: ['heavy', 'desi'] },
  { name: 'Turkey Mince + Pasta', meal: 'dinner', calories: 760, protein: 56, carbs: 82, fat: 16, tags: ['high-protein'] },
  // Snacks
  { name: 'Mass Gainer Shake', meal: 'snack', calories: 600, protein: 40, carbs: 80, fat: 10, tags: ['liquid', 'bulk'] },
  { name: 'Boiled Eggs (4) + Banana', meal: 'snack', calories: 380, protein: 26, carbs: 32, fat: 14, tags: ['easy', 'cheap'] },
  { name: 'Peanut Butter Toast (2 slices)', meal: 'snack', calories: 400, protein: 14, carbs: 40, fat: 20, tags: ['easy'] },
  { name: 'Cottage Cheese + Fruit', meal: 'snack', calories: 280, protein: 22, carbs: 28, fat: 6, tags: ['light'] },
  { name: 'Mixed Nuts (50g)', meal: 'snack', calories: 300, protein: 10, carbs: 10, fat: 26, tags: ['easy', 'calorie-dense'] },
];

// Common foods for quick log
export const COMMON_FOODS = [
  { name: 'Cooked Rice (1 cup)', calories: 206, protein: 4, carbs: 45, fat: 0 },
  { name: 'Chapati (1 piece)', calories: 104, protein: 3, carbs: 18, fat: 3 },
  { name: 'Whole Egg (1)', calories: 78, protein: 6, carbs: 1, fat: 5 },
  { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 4 },
  { name: 'Banana (1 medium)', calories: 89, protein: 1, carbs: 23, fat: 0 },
  { name: 'Peanut Butter (1 tbsp)', calories: 94, protein: 4, carbs: 3, fat: 8 },
  { name: 'Whole Milk (1 cup)', calories: 149, protein: 8, carbs: 12, fat: 8 },
  { name: 'Oats (100g dry)', calories: 389, protein: 17, carbs: 66, fat: 7 },
  { name: 'Tuna (1 can 185g)', calories: 172, protein: 38, carbs: 0, fat: 2 },
  { name: 'Paneer (100g)', calories: 265, protein: 18, carbs: 3, fat: 20 },
  { name: 'Dal (1 cup cooked)', calories: 230, protein: 18, carbs: 39, fat: 1 },
  { name: 'Sweet Potato (100g)', calories: 86, protein: 2, carbs: 20, fat: 0 },
  { name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
  { name: 'Greek Yogurt (100g)', calories: 59, protein: 10, carbs: 4, fat: 0 },
  { name: 'Bread slice (1)', calories: 79, protein: 3, carbs: 15, fat: 1 },
  { name: 'Almonds (30g)', calories: 173, protein: 6, carbs: 6, fat: 15 },
  { name: 'Mutton (100g cooked)', calories: 258, protein: 26, carbs: 0, fat: 17 },
  { name: 'Turkey mince (100g)', calories: 189, protein: 27, carbs: 0, fat: 9 },
  { name: 'Pasta cooked (100g)', calories: 131, protein: 5, carbs: 25, fat: 1 },
  { name: 'Whey Protein (1 scoop 30g)', calories: 120, protein: 24, carbs: 3, fat: 2 },
];

