const URL = "https://teachablemachine.withgoogle.com/models/C8dwdd0xV/";

let model, webcam, maxPredictions;
let userScore = 0;
let compScore = 0;
let isPlaying = false;

const startBtn = document.getElementById('start-btn');
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const countdownEl = document.getElementById('countdown');
const gameResultEl = document.getElementById('game-result');
const userPredictionEl = document.getElementById('user-prediction');
const computerChoiceEl = document.getElementById('computer-choice');
const userScoreEl = document.getElementById('user-score');
const compScoreEl = document.getElementById('comp-score');
const webcamContainer = document.querySelector('.webcam-container');
const computerContainer = document.querySelector('.computer-container');

const choices = {
    "주먹": { icon: "✊", wins: "가위" },
    "가위": { icon: "✌️", wins: "보" },
    "보": { icon: "✋", wins: "주먹" }
};

const labelMap = {
    "Rock": "주먹",
    "Paper": "보",
    "Scissors": "가위",
    "주먹": "주먹",
    "가위": "가위",
    "보": "보"
};

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    startBtn.disabled = true;
    startBtn.textContent = "Loading Model...";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(300, 300, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-wrapper").appendChild(webcam.canvas);
    
    startBtn.disabled = false;
    startBtn.textContent = "🎮 Game Start!";
}

async function loop() {
    webcam.update();
    if (!isPlaying) {
        await predict();
    }
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    let topPrediction = "";
    let maxProbability = 0;

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > maxProbability) {
            maxProbability = prediction[i].probability;
            topPrediction = prediction[i].className;
        }
    }

    const mappedLabel = labelMap[topPrediction] || topPrediction;
    userPredictionEl.textContent = mappedLabel;
    return mappedLabel;
}

async function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    startBtn.disabled = true;
    
    // Reset visuals
    webcamContainer.classList.remove('win-flash', 'lose-flash', 'draw-flash');
    computerContainer.classList.remove('win-flash', 'lose-flash', 'draw-flash');
    gameResultEl.textContent = "Ready...";
    computerChoiceEl.textContent = "❓";

    let count = 3;
    countdownEl.classList.remove('hidden');
    countdownEl.textContent = count;

    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
        } else {
            clearInterval(timer);
            countdownEl.classList.add('hidden');
            resolveGame();
        }
    }, 1000);
}

async function resolveGame() {
    const userChoice = await predict();
    const compChoices = Object.keys(choices);
    const compChoice = compChoices[Math.floor(Math.random() * compChoices.length)];

    computerChoiceEl.textContent = choices[compChoice].icon;

    if (!choices[userChoice]) {
        gameResultEl.textContent = "AI can't see you! 🧐";
    } else if (userChoice === compChoice) {
        gameResultEl.textContent = "Draw! 🤝";
        webcamContainer.classList.add('draw-flash');
        computerContainer.classList.add('draw-flash');
    } else if (choices[userChoice].wins === compChoice) {
        gameResultEl.textContent = "You Win! 🎉";
        userScore++;
        userScoreEl.textContent = userScore;
        webcamContainer.classList.add('win-flash');
        computerContainer.classList.add('lose-flash');
    } else {
        gameResultEl.textContent = "AI Wins! 🤖";
        compScore++;
        compScoreEl.textContent = compScore;
        webcamContainer.classList.add('lose-flash');
        computerContainer.classList.add('win-flash');
    }
    
    isPlaying = false;
    startBtn.disabled = false;
    startBtn.textContent = "Next Round! 🔄";
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

startBtn.addEventListener('click', () => {
    if (!model) {
        init();
    } else {
        startGame();
    }
});

// Load saved preferences
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = "☀️ Light Mode";
}