const generateBtn = document.getElementById('generate-btn');
const lottoNumbersDiv = document.querySelector('.lotto-numbers');

generateBtn.addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    lottoNumbersDiv.innerHTML = sortedNumbers.map(number => `<div class="number">${number}</div>`).join('');
});