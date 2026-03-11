import { GoogleGenerativeAI } from "@google/generative-ai";

const video = document.getElementById('webcam');
const canvas = document.getElementById('capture-canvas');
const captureBtn = document.getElementById('capture-btn');
const retryBtn = document.getElementById('retry-btn');
const loading = document.getElementById('loading');
const resultArea = document.getElementById('result-area');
const analysisText = document.getElementById('analysis-text');
const apiKeyInput = document.getElementById('api-key');

// 1. 웹캠 활성화
async function setupWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user" }, 
            audio: false 
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("웹캠을 활성화할 수 없습니다:", err);
        alert("카메라 권한이 필요합니다.");
    }
}

// 2. 이미지 캡처 및 분석
async function analyzePalm() {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
        alert("Gemini API Key를 입력해주세요.");
        return;
    }

    // 캔버스에 현재 프레임 그리기
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1); // 좌우 반전 해제
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg').split(',')[1];

    // UI 변경
    loading.classList.remove('hidden');
    resultArea.classList.add('hidden');
    captureBtn.classList.add('hidden');
    retryBtn.classList.add('hidden');

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            사용자의 오른손 손금 사진입니다. 다음 지침에 따라 손금을 분석해주세요:
            1. 생명선, 두뇌선, 감정선, 운명선을 식별하고 각각의 의미를 해석하세요.
            2. 전체적인 성격, 건강운, 재물운, 애정운에 대해 설명하세요.
            3. 긍정적이고 신비로운 분위기로 답변하세요.
            4. 한국어로 친절하게 답변하세요.
            5. 답변 형식은 마크다운을 사용하지 말고 깔끔한 텍스트로 구성하세요.
        `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageData,
                    mimeType: "image/jpeg"
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        analysisText.innerText = text;
        resultArea.classList.remove('hidden');
    } catch (err) {
        console.error("분석 중 오류 발생:", err);
        analysisText.innerText = "분석 중 오류가 발생했습니다. API Key를 확인하거나 잠시 후 다시 시도해주세요.";
        resultArea.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
        retryBtn.classList.remove('hidden');
    }
}

// 리트라이 로직
function retry() {
    resultArea.classList.add('hidden');
    retryBtn.classList.add('hidden');
    captureBtn.classList.remove('hidden');
}

// 이벤트 리스너
captureBtn.addEventListener('click', analyzePalm);
retryBtn.addEventListener('click', retry);

// 초기화
setupWebcam();