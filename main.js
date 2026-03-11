const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('lang-select');
const body = document.body;
const menuDisplay = document.getElementById('menu-display');
const placeholder = document.getElementById('placeholder');
const dishImg = document.getElementById('dish-img');
const dishIcon = document.getElementById('dish-icon');
const dishName = document.getElementById('dish-name');
const dishDesc = document.getElementById('dish-desc');
const catButtons = document.querySelectorAll('.cat-btn');

// Translations
const i18n = {
    ko: {
        siteTitle: "세계 요리 추천기",
        mainTitle: "🍽️ 세계 요리 추천",
        mainSubtitle: "카테고리를 선택해 메뉴를 추천받으세요!",
        catKo: "🇰🇷 한식",
        catWe: "🍔 양식",
        catJa: "🍣 일식",
        placeholder: "카테고리를 클릭하면 추천 메뉴가 나타납니다!",
        contactTitle: "🤝 제휴 문의",
        contactDesc: "제휴에 관심이 있으신가요? 메시지를 남겨주세요!",
        formName: "성함",
        formEmail: "이메일 주소",
        formMsg: "문의 내용",
        formSubmit: "문의 보내기",
        darkMode: "🌙 다크 모드",
        lightMode: "☀️ 라이트 모드"
    },
    en: {
        siteTitle: "Global Flavor Recommender",
        mainTitle: "🍽️ World Cuisine",
        mainSubtitle: "Select a cuisine category!",
        catKo: "🇰🇷 Korean",
        catWe: "🍔 Western",
        catJa: "🍣 Japanese",
        placeholder: "Click a category to see a recommendation!",
        contactTitle: "🤝 Partnership Inquiry",
        contactDesc: "Interested in a partnership? Send us a message!",
        formName: "Your Name",
        formEmail: "Your Email",
        formMsg: "Your Message",
        formSubmit: "Send Inquiry",
        darkMode: "🌙 Dark Mode",
        lightMode: "☀️ Light Mode"
    },
    ja: {
        siteTitle: "世界料理おすすめ",
        mainTitle: "🍽️ 世界の料理",
        mainSubtitle: "カテゴリーを選択しておすすめを受けてください！",
        catKo: "🇰🇷 韓国料理",
        catWe: "🍔 洋食",
        catJa: "🍣 日本料理",
        placeholder: "カテゴリーをクリックするとおすすめメニューが表示されます！",
        contactTitle: "🤝 提携のお問い合わせ",
        contactDesc: "提携にご興味がありますか？メッセージを残してください！",
        formName: "お名前",
        formEmail: "メールアドレス",
        formMsg: "お問い合わせ内容",
        formSubmit: "送信する",
        darkMode: "🌙 ダークモード",
        lightMode: "☀️ ライトモード"
    }
};

// Menu Database with Multi-language
const menus = {
    korean: [
        { 
            ko: { name: "비빔밥", desc: "신선한 나물과 고기, 매콤한 고추장이 어우러진 건강한 한 끼 식사입니다." },
            en: { name: "Bibimbap", desc: "A healthy bowl of rice topped with seasonal vegetables, beef, and spicy gochujang sauce." },
            ja: { name: "ビビンバ", desc: "新鮮な野菜とお肉、ピリ辛のコチュジャンが調화した健康的な一食です。" },
            icon: "🥗", 
            img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800"
        },
        { 
            ko: { name: "김치찌개", desc: "잘 익은 김치와 두부, 돼지고기를 넣어 끓인 얼큰하고 시원한 찌개입니다." },
            en: { name: "Kimchi Jjigae", desc: "A spicy, hearty stew made with well-fermented kimchi, tofu, and pork." },
            ja: { name: "キムチチゲ", desc: "よく浸かったキムチと豆腐、豚肉を入れて煮込んだ辛くてコクのあるチゲです。" },
            icon: "🥘", 
            img: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=800"
        },
        { 
            ko: { name: "불고기", desc: "달콤 짭조름한 양념에 재운 소고기를 불에 구워낸 남녀노소 즐기는 요리입니다." },
            en: { name: "Bulgogi", desc: "Thinly sliced beef marinated in a sweet and savory sauce, then grilled to perfection." },
            ja: { name: "プルコギ", desc: "甘じょっぱいタレに漬け込んだ牛肉を火で焼いた、老若男女に愛される料理です。" },
            icon: "🍛", 
            img: "https://images.unsplash.com/photo-1662116765994-1e304604f796?auto=format&fit=crop&q=80&w=800"
        }
    ],
    western: [
        { 
            ko: { name: "등심 스테이크", desc: "육즙이 풍부하고 부드러운 소고기 등심을 갈릭 버터와 함께 구워냈습니다." },
            en: { name: "Ribeye Steak", desc: "Juicy, tender steak grilled with garlic butter and rosemary for a rich flavor." },
            ja: { name: "リブアイステーキ", desc: "肉汁たっぷりで柔らかい牛リブロースを、ガーリックバターと一緒に焼き上げました。" },
            icon: "🥩", 
            img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800"
        },
        { 
            ko: { name: "카르보나라", desc: "계란 노른자와 치즈, 베이컨으로 맛을 낸 고소하고 진한 이탈리아 정통 파스타입니다." },
            en: { name: "Pasta Carbonara", desc: "Classic Italian pasta with a creamy sauce made from eggs, cheese, and crispy bacon." },
            ja: { name: "カルボナーラ", desc: "卵黄とチーズ、ベーコンで味付けした香ばしくて濃厚なイタリア伝統のパスタです。" },
            icon: "🍝", 
            img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800"
        },
        { 
            ko: { name: "클래식 버거", desc: "두툼한 소고기 패티와 신선한 야채가 어우러진 든든한 아메리칸 스타일 버거입니다." },
            en: { name: "Classic Burger", desc: "A thick beef patty with fresh lettuce, tomato, and cheese in a toasted brioche bun." },
            ja: { name: "クラシックバーガー", desc: "厚みのある牛肉パティと新鮮な野菜が調和した、ボリュームたっぷりのアメリカンスタイルバーガーです。" },
            icon: "🍔", 
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800"
        }
    ],
    japanese: [
        { 
            ko: { name: "모둠 초밥", desc: "신선한 제철 생선을 엄선하여 정성스럽게 빚어낸 깔끔한 맛의 초밥입니다." },
            en: { name: "Sushi Platter", desc: "Fresh, high-quality fish served over vinegared rice. A delicate and clean taste." },
            ja: { name: "寿司盛り合わせ", desc: "新鮮な旬の魚を厳選し、丁寧に握ったさっぱりとした味わいのお寿司です。" },
            icon: "🍣", 
            img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800"
        },
        { 
            ko: { name: "돈코츠 라멘", desc: "진하게 우려낸 돼지 사골 육수에 차슈와 반숙란을 곁들인 일본 대표 라멘입니다." },
            en: { name: "Tonkotsu Ramen", desc: "Rich and creamy pork bone broth served with chewy noodles and tender chashu pork." },
            ja: { name: "豚骨ラーメン", desc: "濃厚に煮出した豚骨スープにチャーシューと煮卵を添えた、日本を代表するラーメンです。" },
            icon: "🍜", 
            img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800"
        },
        { 
            ko: { name: "연어 덮밥", desc: "부드러운 연어 회를 듬뿍 올려 와사비와 함께 즐기는 일본식 덮밥입니다." },
            en: { name: "Salmon Donburi", desc: "Fresh slices of raw salmon over a bowl of seasoned rice, served with wasabi." },
            ja: { name: "サーモン丼", desc: "新鮮なサーモンのお刺身をたっぷり乗せ、わさびと一緒に楽しむ日本式の丼ぶりです。" },
            icon: "🍱", 
            img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800"
        }
    ]
};

let currentLang = 'ko';
let currentCategory = null;
let currentDish = null;

// Initialize language
function updateLanguage(lang) {
    currentLang = lang;
    const t = i18n[lang];
    
    document.getElementById('site-title').textContent = t.siteTitle;
    document.getElementById('main-title').textContent = t.mainTitle;
    document.getElementById('main-subtitle').textContent = t.mainSubtitle;
    document.getElementById('cat-ko').textContent = t.catKo;
    document.getElementById('cat-we').textContent = t.catWe;
    document.getElementById('cat-ja').textContent = t.catJa;
    document.getElementById('placeholder-text').textContent = t.placeholder;
    document.getElementById('contact-title').textContent = t.contactTitle;
    document.getElementById('contact-desc').textContent = t.contactDesc;
    document.getElementById('form-name').placeholder = t.formName;
    document.getElementById('form-email').placeholder = t.formEmail;
    document.getElementById('form-msg').placeholder = t.formMsg;
    document.getElementById('form-submit').textContent = t.formSubmit;
    
    // Update theme button text
    if (body.classList.contains('dark-mode')) {
        themeBtn.textContent = t.lightMode;
    } else {
        themeBtn.textContent = t.darkMode;
    }

    // Update currently displayed dish if exists
    if (currentDish) {
        dishName.textContent = currentDish[lang].name;
        dishDesc.textContent = currentDish[lang].desc;
    }
}

// Event Listeners
langSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const t = i18n[currentLang];
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = t.lightMode;
    } else {
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = t.darkMode;
    }
});

catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        const list = menus[category];
        currentDish = list[Math.floor(Math.random() * list.length)];

        placeholder.classList.add('hidden');
        menuDisplay.classList.remove('hidden');
        
        dishImg.src = currentDish.img;
        dishImg.alt = currentDish[currentLang].name;
        dishIcon.textContent = currentDish.icon;
        dishName.textContent = currentDish[currentLang].name;
        dishDesc.textContent = currentDish[currentLang].desc;

        menuDisplay.classList.remove('animate-fade-in');
        void menuDisplay.offsetWidth;
        menuDisplay.classList.add('animate-fade-in');
    });
});

// Load saved preferences
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}
updateLanguage('ko'); // Default to Korean