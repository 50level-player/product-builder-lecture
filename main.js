import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const firebaseConfig = {
  apiKey: "AIzaSyD3Qn8n2h_Gw-kVQwdWcFoSoucJnGPUC4U",
  authDomain: "handfortune-ef99c.firebaseapp.com",
  projectId: "handfortune-ef99c",
  storageBucket: "handfortune-ef99c.firebasestorage.app",
  messagingSenderId: "1004281056770",
  appId: "1:1004281056770:web:393b6ba8a9be6bd344611b",
  measurementId: "G-JS0XQSPMG9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const GEMINI_KEY = "AIzaSyA4KSxUU7x6Q4mlHcqa9gLXUQIqsImErLE";

// DOM Elements
const loginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const userPhoto = document.getElementById('user-photo');
const inputArea = document.getElementById('input-area');
const predictBtn = document.getElementById('predict-btn');
const retryBtn = document.getElementById('retry-btn');
const loading = document.getElementById('loading');
const resultArea = document.getElementById('result-area');
const fortuneText = document.getElementById('fortune-text');
const lottoResults = document.getElementById('lotto-results');

// Auth Logic
loginBtn.addEventListener('click', () => signInWithPopup(auth, provider));
logoutBtn.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginBtn.classList.add('hidden');
        userInfo.classList.remove('hidden');
        inputArea.classList.remove('hidden');
        userName.textContent = user.displayName;
        userPhoto.src = user.photoURL;
    } else {
        loginBtn.classList.remove('hidden');
        userInfo.classList.add('hidden');
        inputArea.classList.add('hidden');
        resultArea.classList.add('hidden');
    }
});

// Fortune & Lotto Logic
async function getFortune() {
    const name = document.getElementById('user-real-name').value;
    const birth = document.getElementById('user-birth').value;

    if (!name || !birth) {
        alert("이름과 생년월일을 입력해주세요.");
        return;
    }

    inputArea.classList.add('hidden');
    loading.classList.remove('hidden');
    resultArea.classList.add('hidden');

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            사용자 정보: 이름(${name}), 생년월일(${birth})
            오늘 날짜: ${new Date().toLocaleDateString()}
            
            지침:
            1. 사용자의 정보를 바탕으로 오늘의 상세 운세를 작성하세요. (건강, 재물, 애정 포함)
            2. 오늘의 운세 기운과 연결된 행운의 로또 번호 5조합(각 6개 숫자, 1-45)을 추천하세요.
            3. 각 로또 조합마다 왜 이 번호들이 추천되었는지 운세와 연결된 "그럴듯한 설명"을 덧붙이세요.
            
            출력 형식 (JSON 구조로 답변):
            {
                "fortune": "운세 내용 문자열...",
                "lottoSets": [
                    {"numbers": [1, 2, 3, 4, 5, 6], "explanation": "설명..."},
                    ... 총 5개
                ]
            }
            마크다운 없이 순수 JSON만 반환하세요.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const data = JSON.parse(response.text().replace(/```json|```/g, "").trim());

        // Display Fortune
        fortuneText.innerText = data.fortune;

        // Display Lotto
        lottoResults.innerHTML = '';
        data.lottoSets.forEach((set, index) => {
            const setDiv = document.createElement('div');
            setDiv.className = 'lotto-item';
            
            const numbersDiv = document.createElement('div');
            numbersDiv.className = 'lotto-numbers';
            set.numbers.sort((a,b) => a-b).forEach(num => {
                const ball = document.createElement('span');
                ball.className = 'num-ball';
                ball.textContent = num;
                numbersDiv.appendChild(ball);
            });

            const descDiv = document.createElement('div');
            descDiv.className = 'lotto-desc';
            descDiv.textContent = `💡 조합 ${index + 1}: ${set.explanation}`;

            setDiv.appendChild(numbersDiv);
            setDiv.appendChild(descDiv);
            lottoResults.appendChild(setDiv);
        });

        resultArea.classList.remove('hidden');
    } catch (err) {
        console.error(err);
        alert("운세를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.");
        inputArea.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

predictBtn.addEventListener('click', getFortune);
retryBtn.addEventListener('click', () => {
    resultArea.classList.add('hidden');
    inputArea.classList.remove('hidden');
});