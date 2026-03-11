const URL = "https://teachablemachine.withgoogle.com/models/DksWuuxib/";

let model, webcam, labelContainer, maxPredictions;
let isRunning = false;

const startBtn = document.getElementById('start-btn');
const retryBtn = document.getElementById('retry-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const resultContainer = document.getElementById('result-container');
const animalDesc = document.getElementById('animal-desc');

const animalMessages = {
    "Dog": "당신은 귀엽고 친근한 강아지상! 🐶\n사람들과 어울리는 것을 좋아하고 밝은 에너지를 가지고 계시네요.",
    "Cat": "당신은 도도하고 매력적인 고양이상! 🐱\n신비로운 분위기와 함께 섬세한 감성을 가지고 계시네요.",
    "강아지": "당신은 귀엽고 친근한 강아지상! 🐶\n사람들과 어울리는 것을 좋아하고 밝은 에너지를 가지고 계시네요.",
    "고양이": "당신은 도도하고 매력적인 고양이상! 🐱\n신비로운 분위기와 함께 섬세한 감성을 가지고 계시네요."
};

async function init() {
    startBtn.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');

    try {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true; 
        webcam = new tmImage.Webcam(300, 300, flip); 
        await webcam.setup(); 
        await webcam.play();
        
        loadingSpinner.classList.add('hidden');
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            const barContainer = document.createElement("div");
            barContainer.className = "prediction-bar-container";
            barContainer.innerHTML = `
                <div class="prediction-label">
                    <span class="class-name"></span>
                    <span class="percentage">0%</span>
                </div>
                <div class="bar-outer">
                    <div class="bar-inner" style="width: 0%"></div>
                </div>
            `;
            labelContainer.appendChild(barContainer);
        }

        resultContainer.classList.remove('hidden');
        retryBtn.classList.remove('hidden');
        isRunning = true;
        window.requestAnimationFrame(loop);
    } catch (err) {
        console.error(err);
        alert("모델을 불러오거나 카메라를 켜는 데 실패했습니다.");
        startBtn.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
    }
}

async function loop() {
    if (!isRunning) return;
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    let topChoice = { className: "", probability: 0 };

    for (let i = 0; i < maxPredictions; i++) {
        const className = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const barContainer = labelContainer.childNodes[i];
        barContainer.querySelector('.class-name').textContent = className;
        barContainer.querySelector('.percentage').textContent = probability + "%";
        barContainer.querySelector('.bar-inner').style.width = probability + "%";

        if (prediction[i].probability > topChoice.probability) {
            topChoice = prediction[i];
        }
    }

    const message = animalMessages[topChoice.className] || `당신은 ${topChoice.className}상입니다! ✨`;
    animalDesc.innerText = message;
}

startBtn.addEventListener('click', init);
retryBtn.addEventListener('click', () => {
    location.reload();
});