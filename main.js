import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_KEY = "AIzaSyA4KSxUU7x6Q4mlHcqa9gLXUQIqsImErLE";

// DOM Elements
const inputArea = document.getElementById('input-area');
const predictBtn = document.getElementById('predict-btn');
const retryBtn = document.getElementById('retry-btn');
const loading = document.getElementById('loading');
const resultArea = document.getElementById('result-area');
const fortuneText = document.getElementById('fortune-text');
const lottoResults = document.getElementById('lotto-results');

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
        const rawText = response.text().replace(/```json|```/g, "").trim();
        const data = JSON.parse(rawText);

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