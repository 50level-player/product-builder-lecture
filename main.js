const URL = "https://teachablemachine.withgoogle.com/models/DksWuuxib/";

let model, webcam, labelContainer, maxPredictions;
let isRunning = false;

const startBtn = document.getElementById('start-btn');
const retryBtn = document.getElementById('retry-btn');
const downloadBtn = document.getElementById('download-btn');
const resultBtns = document.getElementById('result-btns');
const loadingSpinner = document.getElementById('loading-spinner');
const resultContainer = document.getElementById('result-container');
const animalDesc = document.getElementById('animal-desc');
const snapshotArea = document.getElementById('snapshot-area');
const body = document.body;

const texts = {
    siteTitle: "AI 동물상 테스트 - 강아지? 고양이?",
    mainTitle: "🐶 AI 동물상 판독기 🐱",
    mainSubtitle: "당신은 귀여운 강아지상? 도도한 고양이상?",
    appDesc: "최첨단 AI로 당신의 숨겨진 동물상을 찾아보세요! 카메라에 얼굴을 보여주기만 하면 신비로운 분석이 시작됩니다. 🐾",
    webcamWarning: "⚠️ 알림: 이 앱은 웹캠 연결이 필요합니다.",
    loadingText: "AI 영혼을 불러오는 중...",
    startBtn: "✨ 테스트 시작하기",
    retryBtn: "🔄 다시 하기",
    downloadBtn: "📸 결과 저장하기",
    resultTitle: "분석 결과",
    dog: "강아지상",
    cat: "고양이상",
    dogDesc: "당신은 귀엽고 친근한 강아지상! 🐶\n사람들과 어울리는 것을 좋아하고 밝은 에너지를 가지고 계시네요.",
    catDesc: "당신은 도도하고 매력적인 고양이상! 🐱\n신비로운 분위기와 함께 섬세한 감성을 가지고 계시네요."
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
        const container = document.getElementById("webcam-container");
        container.innerHTML = '';
        container.appendChild(webcam.canvas);
        
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = '';
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
        resultBtns.classList.remove('hidden');
        isRunning = true;
        window.requestAnimationFrame(loop);
    } catch (err) {
        console.error(err);
        alert("모델 또는 카메라를 로드하는 데 실패했습니다.");
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
    if (!model) return;
    const prediction = await model.predict(webcam.canvas);
    let topChoice = { className: "", probability: 0 };

    for (let i = 0; i < maxPredictions; i++) {
        const className = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        let translatedName = className;
        if (className.toLowerCase().includes('dog') || className.includes('강아지')) {
            translatedName = texts.dog;
        } else if (className.toLowerCase().includes('cat') || className.includes('고양이')) {
            translatedName = texts.cat;
        }
        
        const barContainer = labelContainer.childNodes[i];
        if (barContainer) {
            barContainer.querySelector('.class-name').textContent = translatedName;
            barContainer.querySelector('.percentage').textContent = probability + "%";
            barContainer.querySelector('.bar-inner').style.width = probability + "%";
        }

        if (prediction[i].probability > topChoice.probability) {
            topChoice = prediction[i];
        }
    }

    const isDog = topChoice.className.toLowerCase().includes('dog') || topChoice.className.includes('강아지');
    const message = isDog ? texts.dogDesc : texts.catDesc;
    animalDesc.innerText = message;
}

async function saveSnapshot() {
    const wasRunning = isRunning;
    isRunning = false;
    const canvas = await html2canvas(snapshotArea, {
        backgroundColor: "#fffaf0",
        scale: 2
    });
    
    const link = document.createElement('a');
    link.download = `AI-동물상-결과-${new Date().getTime()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    isRunning = wasRunning;
}

startBtn.addEventListener('click', init);
retryBtn.addEventListener('click', () => location.reload());
downloadBtn.addEventListener('click', saveSnapshot);

// Initialize with Korean font class
body.classList.add('lang-ko');