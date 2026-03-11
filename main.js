const generateBtn = document.getElementById('generate-btn');
const lottoNumbersDiv = document.querySelector('.lotto-numbers');
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = '☀️ Light Mode';
}

// Theme toggle logic
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

// Lotto number generation logic
generateBtn.addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    lottoNumbersDiv.innerHTML = sortedNumbers.map(number => `<div class="number">${number}</div>`).join('');
});