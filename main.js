const URL = "https://teachablemachine.withgoogle.com/models/C8dwdd0xV/";

let model, webcam, labelContainer, maxPredictions;
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

const choices = {
    "주먹": { icon: "✊", wins: "가위" },
    "가위": { icon: "✌️", wins: "보" },
    "보": { icon: "✋", wins: "주먹" }
};

// Map Teachable Machine labels to our internal labels if necessary
// Assuming labels are "주먹", "가위", "보" or similar English equivalents
const labelMap = {
    "Rock": "주먹",
    "Paper": "보",
    "Scissors": "가위",
    "주먹": "주먹",
    "가위": "가위",
    "보": "보"
};

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    startBtn.disabled = true;
    startBtn.textContent = "Loading Model...";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-wrapper").appendChild(webcam.canvas);
    
    startBtn.disabled = false;
    startBtn.textContent = "🎮 Game Start!";
}

async function loop() {
    webcam.update(); // update the webcam frame
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
    gameResultEl.textContent = "Get Ready!";
    computerChoiceEl.textContent = "❓";

    // Countdown
    let count = 3;
    countdownEl.classList.remove('hidden');
    countdownEl.textContent = count;

    const timer = setInterval(async () => {
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
        } else {
            clearInterval(timer);
            countdownEl.classList.add('hidden');
            await resolveGame();
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
    } else if (choices[userChoice].wins === compChoice) {
        gameResultEl.textContent = "You Win! 🎉";
        userScore++;
    } else {
        gameResultEl.textContent = "AI Wins! 🤖";
        compScore++;
    }

    userScoreEl.textContent = userScore;
    compScoreEl.textContent = compScore;
    
    isPlaying = false;
    startBtn.disabled = false;
    startBtn.textContent = "Next Round! 🔄";
}

// Theme Logic
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeBtn.textContent = body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
});

startBtn.addEventListener('click', () => {
    if (!model) {
        init();
    } else {
        startGame();
    }
});

// Initial state
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') body.classList.add('dark-mode');