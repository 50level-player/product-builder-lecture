import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: Firebase Console에서 발급받은 실제 설정값으로 교체해야 합니다.
const firebaseConfig = {
  apiKey: "AIzaSyD3Qn8n2h_Gw-kVQwdWcFoSoucJnGPUC4U",
  authDomain: "handfortune-ef99c.firebaseapp.com",
  projectId: "handfortune-ef99c",
  storageBucket: "handfortune-ef99c.firebasestorage.app",
  messagingSenderId: "1004281056770",
  appId: "1:1004281056770:web:393b6ba8a9be6bd344611b",
  measurementId: "G-JS0XQSPMG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM Elements
const loginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const userPhoto = document.getElementById('user-photo');
const gameArea = document.getElementById('game-area');
const video = document.getElementById('webcam');
const canvas = document.getElementById('capture-canvas');
const captureBtn = document.getElementById('capture-btn');
const retryBtn = document.getElementById('retry-btn');
const loading = document.getElementById('loading');
const resultArea = document.getElementById('result-area');
const analysisText = document.getElementById('analysis-text');

// 1. 구글 로그인/로그아웃 로직
loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider).catch(err => console.error("Login failed:", err));
});

logoutBtn.addEventListener('click', () => {
    signOut(auth);
});

// 인증 상태 감시
onAuthStateChanged(auth, (user) => {
    if (user) {
        // 로그인 상태
        loginBtn.classList.add('hidden');
        userInfo.classList.remove('hidden');
        gameArea.classList.remove('hidden');
        userName.textContent = user.displayName;
        userPhoto.src = user.photoURL;
        setupWebcam();
    } else {
        // 로그아웃 상태
        loginBtn.classList.remove('hidden');
        userInfo.classList.add('hidden');
        gameArea.classList.add('hidden');
        resultArea.classList.add('hidden');
        stopWebcam();
    }
});

// 2. 웹캠 제어
let stream = null;
async function setupWebcam() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        alert("카메라 권한이 필요합니다.");
    }
}

function stopWebcam() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

// 3. Gemini 분석 로직
async function analyzePalm() {
    // API KEY 노출을 방지하려면 서버 측에서 처리하거나, Vertex AI for Firebase를 설정해야 합니다.
    // 여기서는 동작 방식을 보여주기 위해 이전 로직을 유지하되, 로그인된 사용자만 버튼을 누를 수 있습니다.
    const TEMPORARY_GEMINI_KEY = "YOUR_GEMINI_API_KEY_HERE"; // 실제 운영 시에는 백엔드 프록시 권장

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg').split(',')[1];

    loading.classList.remove('hidden');
    resultArea.classList.add('hidden');
    captureBtn.classList.add('hidden');

    try {
        const genAI = new GoogleGenerativeAI(TEMPORARY_GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "사용자의 오른손 손금 사진입니다. 생명선, 두뇌선, 감정선을 분석하여 성격과 미래 운세를 신비로운 분위기로 5문장 내외로 설명해줘.";

        const result = await model.generateContent([
            prompt,
            { inlineData: { data: imageData, mimeType: "image/jpeg" } }
        ]);

        analysisText.innerText = await result.response.text();
        resultArea.classList.remove('hidden');
    } catch (err) {
        analysisText.innerText = "분석 중 오류가 발생했습니다.";
        resultArea.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
        retryBtn.classList.remove('hidden');
    }
}

captureBtn.addEventListener('click', analyzePalm);
retryBtn.addEventListener('click', () => {
    resultArea.classList.add('hidden');
    retryBtn.classList.add('hidden');
    captureBtn.classList.remove('hidden');
});