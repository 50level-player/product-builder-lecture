const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const menuDisplay = document.getElementById('menu-display');
const menuIcon = document.querySelector('.menu-icon');
const menuName = document.querySelector('.menu-name');
const mealButtons = document.querySelectorAll('.meal-btn');

// Menu Database
const menus = {
    breakfast: [
        { name: "Toast & Jam", icon: "🍞" },
        { name: "Scrambled Eggs", icon: "🍳" },
        { name: "Yogurt Bowl", icon: "🥣" },
        { name: "Pancakes", icon: "🥞" },
        { name: "Fresh Fruit", icon: "🍎" },
        { name: "Croissant", icon: "🥐" }
    ],
    lunch: [
        { name: "Bibimbap", icon: "🥗" },
        { name: "Chicken Sandwich", icon: "🥪" },
        { name: "Pasta Carbonara", icon: "🍝" },
        { name: "Kimchi Stew", icon: "🥘" },
        { name: "Burger & Fries", icon: "🍔" },
        { name: "Sushi Platter", icon: "🍣" }
    ],
    dinner: [
        { name: "Steak", icon: "🥩" },
        { name: "Spicy Tofu Stew", icon: "🍲" },
        { name: "Roasted Chicken", icon: "🍗" },
        { name: "Bulgogi", icon: "🍛" },
        { name: "Tacos", icon: "🌮" },
        { name: "Pizza Night", icon: "🍕" }
    ]
};

// Theme management
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = '☀️ Light Mode';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = '🌙 Dark Mode';
    }
});

// Menu Recommendation Logic
mealButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const mealType = btn.getAttribute('data-meal');
        const mealList = menus[mealType];
        
        // Random selection
        const randomIndex = Math.floor(Math.random() * mealList.length);
        const selected = mealList[randomIndex];

        // Display with animation
        menuDisplay.classList.remove('animate-pop');
        void menuDisplay.offsetWidth; // Trigger reflow
        
        menuIcon.textContent = selected.icon;
        menuName.textContent = selected.name;
        menuDisplay.classList.add('animate-pop');
    });
});