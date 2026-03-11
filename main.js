const URL = "https://teachablemachine.withgoogle.com/models/DksWuuxib/";

let model, webcam, labelContainer, maxPredictions;
let isRunning = false;
let currentLang = 'en';

const startBtn = document.getElementById('start-btn');
const retryBtn = document.getElementById('retry-btn');
const downloadBtn = document.getElementById('download-btn');
const resultBtns = document.getElementById('result-btns');
const loadingSpinner = document.getElementById('loading-spinner');
const resultContainer = document.getElementById('result-container');
const animalDesc = document.getElementById('animal-desc');
const langSelect = document.getElementById('lang-select');
const snapshotArea = document.getElementById('snapshot-area');

const i18n = {
    en: {
        siteTitle: "AI Animal Face Test - Dog or Cat?",
        mainTitle: "🐶 AI Face Decoder 🐱",
        mainSubtitle: "Are you a cute Puppy or a chic Kitty?",
        appDesc: "Find out your hidden animal spirit with our advanced AI! Just show your face to the camera and let the magic happen. 🐾",
        webcamWarning: "⚠️ Note: This app requires a webcam to function.",
        loadingText: "Summoning AI Spirit...",
        startBtn: "✨ Start Analysis",
        retryBtn: "🔄 Try Again",
        downloadBtn: "📸 Save Snapshot",
        resultTitle: "Analysis Result",
        dog: "You are a cute and friendly Puppy! 🐶\nYou love hanging out with people and have a bright, positive energy.",
        cat: "You are a chic and charming Kitty! 🐱\nYou have a mysterious vibe and a delicate, sensitive soul."
    },
    ko: {
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
        dog: "당신은 귀엽고 친근한 강아지상! 🐶\n사람들과 어울리는 것을 좋아하고 밝은 에너지를 가지고 계시네요.",
        cat: "당신은 도도하고 매력적인 고양이상! 🐱\n신비로운 분위기와 함께 섬세한 감성을 가지고 계시네요."
    },
    ja: {
        siteTitle: "AI動物顔診断 - イヌ派？ネコ派？",
        mainTitle: "🐶 AI動物顔診断 🐱",
        mainSubtitle: "あなたは可愛いイヌ顔？それともクールなネコ顔？",
        appDesc: "最先端AIであなたの隠れた動物タイプ를 診断しましょう！カメラ에 顔을 映すだけで, 魔法のような分析が始まります. 🐾",
        webcamWarning: "⚠️ 注意: このアプリはウェブカメラが必要です.",
        loadingText: "AIを呼び出し中...",
        startBtn: "✨ 診断を始める",
        retryBtn: "🔄 もう一度",
        downloadBtn: "📸 結果を保存",
        resultTitle: "診断結果",
        dog: "あなたは可愛くてフレンドリーなイヌ顔！ 🐶\n人と過ごすのが大好きで, 明るいエネルギーを持っていますね。",
        cat: "あなたはクールで魅力的なネコ顔！ 🐱\nミステリアスな雰囲気と, 繊細な感性を持っていますね。"
    }
};

function updateLanguage(lang) {
    currentLang = lang;
    const t = i18n[lang];
    document.title = t.siteTitle;
    document.getElementById('main-title').textContent = t.mainTitle;
    document.getElementById('main-subtitle').textContent = t.mainSubtitle;
    document.getElementById('app-desc').textContent = t.appDesc;
    document.getElementById('webcam-warning').textContent = t.webcamWarning;
    document.getElementById('loading-text').textContent = t.loadingText;
    document.getElementById('start-btn').textContent = t.startBtn;
    document.getElementById('retry-btn').textContent = t.retryBtn;
    document.getElementById('download-btn').textContent = t.downloadBtn;
    document.getElementById('result-title').textContent = t.resultTitle;
    
    if (isRunning) predict();
}

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
        alert("Fail to load model or camera.");
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
        if (barContainer) {
            barContainer.querySelector('.class-name').textContent = className;
            barContainer.querySelector('.percentage').textContent = probability + "%";
            barContainer.querySelector('.bar-inner').style.width = probability + "%";
        }

        if (prediction[i].probability > topChoice.probability) {
            topChoice = prediction[i];
        }
    }

    const t = i18n[currentLang];
    const message = (topChoice.className === "Dog" || topChoice.className === "강아지") ? t.dog : t.cat;
    animalDesc.innerText = message;
}

// Snapshot Logic
async function saveSnapshot() {
    isRunning = false; // Stop live update for snapshot
    const canvas = await html2canvas(snapshotArea, {
        backgroundColor: "#fffaf0",
        scale: 2 // High quality
    });
    
    const link = document.createElement('a');
    link.download = `AI-Animal-Result-${new Date().getTime()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    isRunning = true; // Resume
}

langSelect.addEventListener('change', (e) => updateLanguage(e.target.value));
startBtn.addEventListener('click', init);
retryBtn.addEventListener('click', () => location.reload());
downloadBtn.addEventListener('click', saveSnapshot);

updateLanguage('en');