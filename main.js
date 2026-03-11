const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const menuDisplay = document.getElementById('menu-display');
const placeholder = document.getElementById('placeholder');
const dishImg = document.getElementById('dish-img');
const dishIcon = document.getElementById('dish-icon');
const dishName = document.getElementById('dish-name');
const dishDesc = document.getElementById('dish-desc');
const catButtons = document.querySelectorAll('.cat-btn');

// Menu Database
const menus = {
    korean: [
        { 
            name: "Bibimbap", 
            icon: "🥗", 
            desc: "A healthy bowl of rice topped with seasonal vegetables, beef, and spicy gochujang sauce.",
            img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=600"
        },
        { 
            name: "Kimchi Jjigae", 
            icon: "🥘", 
            desc: "A spicy, hearty stew made with well-fermented kimchi, tofu, and pork.",
            img: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=600"
        },
        { 
            name: "Bulgogi", 
            icon: "🍛", 
            desc: "Thinly sliced beef marinated in a sweet and savory sauce, then grilled to perfection.",
            img: "https://images.unsplash.com/photo-1662116765994-1e304604f796?q=80&w=600"
        }
    ],
    western: [
        { 
            name: "Ribeye Steak", 
            icon: "🥩", 
            desc: "Juicy, tender steak grilled with garlic butter and rosemary for a rich flavor.",
            img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=600"
        },
        { 
            name: "Pasta Carbonara", 
            icon: "🍝", 
            desc: "Classic Italian pasta with a creamy sauce made from eggs, cheese, and crispy bacon.",
            img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600"
        },
        { 
            name: "Classic Burger", 
            icon: "🍔", 
            desc: "A thick beef patty with fresh lettuce, tomato, and cheese in a toasted brioche bun.",
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600"
        }
    ],
    japanese: [
        { 
            name: "Sushi Platter", 
            icon: "🍣", 
            desc: "Fresh, high-quality fish served over vinegared rice. A delicate and clean taste.",
            img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600"
        },
        { 
            name: "Tonkotsu Ramen", 
            icon: "🍜", 
            desc: "Rich and creamy pork bone broth served with chewy noodles and tender chashu pork.",
            img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600"
        },
        { 
            name: "Salmon Donburi", 
            icon: "🍱", 
            desc: "Fresh slices of raw salmon over a bowl of seasoned rice, served with wasabi.",
            img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600"
        }
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

// Category Selection Logic
catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        const list = menus[category];
        const randomItem = list[Math.floor(Math.random() * list.length)];

        // Hide placeholder, show display
        placeholder.classList.add('hidden');
        menuDisplay.classList.remove('hidden');
        
        // Update content
        dishImg.src = randomItem.img;
        dishImg.alt = randomItem.name;
        dishIcon.textContent = randomItem.icon;
        dishName.textContent = randomItem.name;
        dishDesc.textContent = randomItem.desc;

        // Animate
        menuDisplay.classList.remove('animate-fade-in');
        void menuDisplay.offsetWidth; // Trigger reflow
        menuDisplay.classList.add('animate-fade-in');
    });
});