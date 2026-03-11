const themeBtn = document.getElementById('theme-btn');
const langSelect = document.getElementById('lang-select');
const body = document.body;
const menuDisplay = document.getElementById('menu-display');
const placeholder = document.getElementById('placeholder');
const dishImg = document.getElementById('dish-img');
const dishIcon = document.getElementById('dish-icon');
const dishName = document.getElementById('dish-name');
const dishDesc = document.getElementById('dish-desc');
const wikiLink = document.getElementById('wiki-link');
const catButtons = document.querySelectorAll('.cat-btn');

const i18n = {
    ko: {
        siteTitle: "세계 요리 추천기",
        mainTitle: "🍽️ 세계 요리 추천",
        mainSubtitle: "카테고리를 선택해 Wikipedia에서 정보를 가져옵니다!",
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
        lightMode: "☀️ 라이트 모드",
        readMore: "📖 Wikipedia에서 더 읽어보기"
    },
    en: {
        siteTitle: "Global Flavor Recommender",
        mainTitle: "🍽️ World Cuisine",
        mainSubtitle: "Select a category to fetch info from Wikipedia!",
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
        lightMode: "☀️ Light Mode",
        readMore: "📖 Read more on Wikipedia"
    },
    ja: {
        siteTitle: "세계料理おすすめ",
        mainTitle: "🍽️ 世界の料理",
        mainSubtitle: "カテゴリーを選択してWikipediaから情報を取得します！",
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
        lightMode: "☀️ ライトモード",
        readMore: "📖 Wikipediaで詳しく読む"
    }
};

const menus = {
    korean: [
        "Bibimbap", "Kimchi", "Bulgogi", "Tteokbokki", "Samgyeopsal", 
        "Japchae", "Samgyetang", "Pajeon", "Galbi", "Naengmyeon", 
        "Kimbap", "Sundubu-jjigae", "Dak-galbi", "Mandu", "Jajangmyeon", 
        "Jjamppong", "Bossam", "Gukbap", "Yukhoe", "Hoe (food)"
    ],
    japanese: [
        "Sushi", "Ramen", "Sashimi", "Tempura", "Udon", 
        "Tonkatsu", "Yakitori", "Takoyaki", "Okonomiyaki", "Unadon", 
        "Soba", "Miso soup", "Onigiri", "Japanese curry", "Wagyu", 
        "Gyoza", "Oden", "Sukiyaki", "Kaiseki", "Omurice"
    ],
    western: [
        "Steak", "Pasta", "Hamburger", "Pizza", "Fish and chips", 
        "Caesar salad", "Beef stew", "Taco", "Eggs Benedict", "Roast chicken", 
        "Lasagna", "Clam chowder", "Hot dog", "Barbecue ribs", "Grilled cheese", 
        "Onion soup", "Pancake", "Shepherd's pie", "Macaroni and cheese", "Buffalo wing"
    ]
};

let currentLang = 'ko';
let currentDishData = null;

function updateLanguage(lang) {
    currentLang = lang;
    const t = i18n[lang];
    document.title = t.siteTitle;
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
    wikiLink.textContent = t.readMore;

    if (body.classList.contains('dark-mode')) {
        themeBtn.textContent = t.lightMode;
    } else {
        themeBtn.textContent = t.darkMode;
    }

    if (currentDishData) {
        dishName.textContent = currentDishData.title;
        dishDesc.textContent = currentDishData.extract;
    }
}

langSelect.addEventListener('change', (e) => updateLanguage(e.target.value));

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

async function fetchWikiData(title) {
    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching from Wikipedia:', error);
        return null;
    }
}

catButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
        const category = btn.getAttribute('data-category');
        const list = menus[category];
        const randomTitle = list[Math.floor(Math.random() * list.length)];
        
        const data = await fetchWikiData(randomTitle);
        if (data) {
            currentDishData = data;
            placeholder.classList.add('hidden');
            menuDisplay.classList.remove('hidden');
            
            dishImg.src = data.thumbnail ? data.thumbnail.source : 'https://via.placeholder.com/800x400?text=No+Image+Available';
            dishImg.alt = data.title;
            dishIcon.textContent = "🍴"; // Default icon for all
            dishName.textContent = data.title;
            dishDesc.textContent = data.extract;
            wikiLink.href = data.content_urls.desktop.page;

            // Disqus Reset Logic
            if (typeof DISQUS !== 'undefined') {
                DISQUS.reset({
                    reload: true,
                    config: function () {
                        this.page.identifier = data.titles.canonical;
                        this.page.url = window.location.href + '#!' + data.titles.canonical;
                        this.page.title = data.title;
                    }
                });
            } else {
                // First time loading Disqus
                window.disqus_config = function () {
                    this.page.identifier = data.titles.canonical;
                    this.page.url = window.location.href + '#!' + data.titles.canonical;
                    this.page.title = data.title;
                };
                (function() {
                    var d = document, s = d.createElement('script');
                    s.src = 'https://product-builderjj.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                })();
            }

            menuDisplay.classList.remove('animate-fade-in');
            void menuDisplay.offsetWidth;
            menuDisplay.classList.add('animate-fade-in');
        }
    });
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') body.classList.add('dark-mode');
updateLanguage('ko');