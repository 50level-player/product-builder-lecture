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

const i18n = {
    ko: {
        siteTitle: "세계 요리 추천기",
        mainTitle: "🍽️ 세계 요리 추천",
        mainSubtitle: "카테고리를 선택해 20가지 메뉴 중 하나를 추천받으세요!",
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
        mainSubtitle: "Select a category to get one of 20 recommendations!",
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
        siteTitle: "세계料理おすすめ",
        mainTitle: "🍽️ 世界の料理",
        mainSubtitle: "カテゴリーを選択して20種類のメニューからおすすめを受けてください！",
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

const menus = {
    korean: [
        { ko: { name: "비빔밥", desc: "고추장과 각종 나물이 어우러진 비빔밥" }, en: { name: "Bibimbap", desc: "Mixed rice with vegetables and spicy sauce" }, ja: { name: "ビビンバ", desc: "野菜とコチュジャンの混ぜご飯" }, icon: "🥗", img: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "김치찌개", desc: "얼큰한 한국의 전통 김치찌개" }, en: { name: "Kimchi Jjigae", desc: "Spicy kimchi stew with pork and tofu" }, ja: { name: "キムチチゲ", desc: "ピリ辛の伝統的なキムチチゲ" }, icon: "🥘", img: "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "불고기", desc: "달콤한 양념에 재운 소고기 요리" }, en: { name: "Bulgogi", desc: "Marinated sliced beef barbecue" }, ja: { name: "プルコギ", desc: "甘いタレに漬け込んだ牛肉料理" }, icon: "🍛", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "떡볶이", desc: "매콤달콤한 국민 간식 떡볶이" }, en: { name: "Tteokbokki", desc: "Spicy stirred rice cakes" }, ja: { name: "トッポギ", desc: "甘辛い韓国の国民的人気おやつ" }, icon: "🌶️", img: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "삼겹살", desc: "지글지글 구워먹는 돼지 삼겹살" }, en: { name: "Samgyeopsal", desc: "Grilled pork belly barbecue" }, ja: { name: "サムギョプサル", desc: "ジューシーに焼いた豚の三枚肉" }, icon: "🥓", img: "https://images.unsplash.com/photo-1628123281987-0b7309575d1d?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "잡채", desc: "쫄깃한 당면과 채소 볶음 요리" }, en: { name: "Japchae", desc: "Stir-fried glass noodles with vegetables" }, ja: { name: "チャプチェ", desc: "春雨と野菜の炒め物" }, icon: "🥢", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "삼계탕", desc: "건강을 생각한 인삼 닭 한 마리" }, en: { name: "Samgyetang", desc: "Ginseng chicken soup" }, ja: { name: "サムゲタン", desc: "高麗人参入りの鶏の健康スープ" }, icon: "🍗", img: "https://images.unsplash.com/photo-1644600120462-97be23e980f7?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "해물파전", desc: "바삭하고 고소한 해물 부침개" }, en: { name: "Haemul Pajeon", desc: "Seafood and green onion pancake" }, ja: { name: "海鮮チヂミ", desc: "サクサクの海鮮チヂミ" }, icon: "🥞", img: "https://images.unsplash.com/photo-1616669944447-d65be4cc94e0?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "갈비찜", desc: "부드럽고 달콤한 소갈비 찜" }, en: { name: "Galbi-jjim", desc: "Braised beef short ribs" }, ja: { name: "カルビチム", desc: "柔らかく煮込んだ牛カルビ" }, icon: "🍖", img: "https://images.unsplash.com/photo-1601356616022-2936780775a2?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "냉면", desc: "시원한 육수의 평양식 물냉면" }, en: { name: "Naengmyeon", desc: "Cold buckwheat noodles" }, ja: { name: "冷麺", desc: "ひんやりスープの韓国冷麺" }, icon: "❄️", img: "https://images.unsplash.com/photo-1526318896980-cf78c088911c?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "김밥", desc: "간편하고 맛있는 국민 도시락 김밥" }, en: { name: "Kimbap", desc: "Korean seaweed rice rolls" }, ja: { name: "キンパ", desc: "海苔で巻いた韓国風海苔巻き" }, icon: "🍱", img: "https://images.unsplash.com/photo-1592688014201-92f7c0a96996?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "순두부찌개", desc: "부드러운 두부와 얼큰한 국물" }, en: { name: "Sundubu-jjigae", desc: "Soft tofu stew" }, ja: { name: "スンドゥブチゲ", desc: "柔らかい豆腐のピリ辛チゲ" }, icon: "🍲", img: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "닭갈비", desc: "매콤한 양념의 춘천식 닭갈비" }, en: { name: "Dak-galbi", desc: "Spicy stir-fried chicken" }, ja: { name: "タッカルビ", desc: "ピリ辛タレの鶏肉炒め" }, icon: "🥘", img: "https://images.unsplash.com/photo-1632778149125-96c21c70176b?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "만두", desc: "속이 꽉 찬 고소한 고기 만두" }, en: { name: "Mandu", desc: "Korean dumplings" }, ja: { name: "マンドゥ", desc: "具沢山の韓国風餃子" }, icon: "🥟", img: "https://images.unsplash.com/photo-1563245332-692e89974df3?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "짜장면", desc: "진한 춘장 소스의 블랙 누들" }, en: { name: "Jajangmyeon", desc: "Black bean sauce noodles" }, ja: { name: "ジャジャン麺", desc: "黒いソースの韓国風ジャジャン麺" }, icon: "🍜", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "짬뽕", desc: "얼큰한 해산물 국물 국수" }, en: { name: "Jjamppong", desc: "Spicy seafood noodle soup" }, ja: { name: "チャンポン", desc: "海鮮のピリ辛麺" }, icon: "🌶️", img: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "보쌈", desc: "담백하게 삶아낸 돼지고기 수육" }, en: { name: "Bossam", desc: "Boiled pork wraps" }, ja: { name: "ポッサム", desc: "茹でた豚肉の包み料理" }, icon: "🥬", img: "https://images.unsplash.com/photo-1628468305364-77a82b47565b?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "국밥", desc: "뜨끈한 국물에 밥을 만 국밥" }, en: { name: "Gukbap", desc: "Rice in hot soup" }, ja: { name: "クッパ", desc: "温かいスープご飯" }, icon: "🥣", img: "https://images.unsplash.com/photo-1630138760975-d4198305f884?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "육회", desc: "신선한 소고기 회 요리" }, en: { name: "Yukhoe", desc: "Korean beef tartare" }, ja: { name: "ユッケ", desc: "新鮮な牛肉の刺身" }, icon: "🥩", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "닭강정", desc: "달콤하고 바삭한 한국식 순살 치킨" }, en: { name: "Dakgangjeong", desc: "Sweet and crispy Korean fried chicken" }, ja: { name: "タッカンジョン", desc: "甘辛いカリカリの韓国風鶏唐揚げ" }, icon: "🍗", img: "https://images.unsplash.com/photo-1635345758223-96b44a299f92?auto=format&fit=crop&q=80&w=800" }
    ],
    western: [
        { ko: { name: "치즈 버거", desc: "아메리칸 클래식 치즈 버거" }, en: { name: "Cheese Burger", desc: "Classic American burger" }, ja: { name: "チーズバーガー", desc: "アメリカンなチーズバーガー" }, icon: "🍔", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "마르게리타 피자", desc: "신선한 토마토와 바질의 피자" }, en: { name: "Pizza Margherita", desc: "Tomato and basil pizza" }, ja: { name: "マルゲリータ", desc: "トマトとバジルのピザ" }, icon: "🍕", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "립아이 스테이크", desc: "육즙 가득한 프리미엄 스테이크" }, en: { name: "Ribeye Steak", desc: "Juicy premium steak" }, ja: { name: "リブアイステーキ", desc: "肉汁たっぷりのステーキ" }, icon: "🥩", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "카르보나라", desc: "정통 이탈리안 크림 파스타" }, en: { name: "Carbonara", desc: "Authentic Italian pasta" }, ja: { name: "カルボナーラ", desc: "本格イタリアンパスタ" }, icon: "🍝", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "피쉬 앤 칩스", desc: "영국 스타일 생선 튀김" }, en: { name: "Fish and Chips", desc: "British style fried fish" }, ja: { name: "フィッシュ＆チップス", desc: "イギリス風白身魚のフライ" }, icon: "🐟", img: "https://images.unsplash.com/photo-1524339102455-6fe649520c18?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "시저 샐러드", desc: "신선한 로메인과 소스의 만남" }, en: { name: "Caesar Salad", desc: "Fresh romaine salad" }, ja: { name: "シーザーサラダ", desc: "新鮮なロメインレタスのサラダ" }, icon: "🥗", img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "비프 스튜", desc: "진하고 따뜻한 소고기 스튜" }, en: { name: "Beef Stew", desc: "Rich and warm beef stew" }, ja: { name: "ビーフシチュー", desc: "濃厚で温かいビーフシチュー" }, icon: "🍲", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "타코", desc: "멕시코 스타일의 매콤한 타코" }, en: { name: "Tacos", desc: "Mexican style spicy tacos" }, ja: { name: "タコス", desc: "メキシコ風のスパイシーなタコス" }, icon: "🌮", img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "에그 베네딕트", desc: "완벽한 브런치 에그 요리" }, en: { name: "Eggs Benedict", desc: "Perfect brunch eggs" }, ja: { name: "エッグベネディクト", desc: "完璧なブランチ料理" }, icon: "🍳", img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "로스트 치킨", desc: "오븐에 구워 담백한 닭 요리" }, en: { name: "Roasted Chicken", desc: "Oven-roasted chicken" }, ja: { name: "ローストチキン", desc: "オーブンで焼いた鶏料理" }, icon: "🍗", img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "라자냐", desc: "층층이 쌓인 치즈와 파스타" }, en: { name: "Lasagna", desc: "Layered cheese and pasta" }, ja: { name: "ラザニア", desc: "層になったチーズとパスタ" }, icon: "🧀", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "클램 차우더", desc: "부드럽고 고소한 조개 스프" }, en: { name: "Clam Chowder", desc: "Creamy clam soup" }, ja: { name: "クラムチャウダー", desc: "クリーミーな貝のスープ" }, icon: "🥣", img: "https://images.unsplash.com/photo-1541944751-69ed3948835d?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "핫도그", desc: "뉴욕 스타일 클래식 핫도그" }, en: { name: "Hot Dog", desc: "NY style classic hot dog" }, ja: { name: "ホットドッグ", desc: "ニューヨーク風ホットドッグ" }, icon: "🌭", img: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "바비큐 립", desc: "달콤하고 짭짤한 돼지 갈비" }, en: { name: "BBQ Ribs", desc: "Sweet and salty pork ribs" }, ja: { name: "バーベキューリブ", desc: "甘じょっぱいスペアリブ" }, icon: "🍖", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "그릴드 치즈", desc: "치즈가 녹아내리는 샌드위치" }, en: { name: "Grilled Cheese", desc: "Melting cheese sandwich" }, ja: { name: "グリルドチーズ", desc: "とろけるチーズのサンド" }, icon: "🥪", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "어니언 스프", desc: "깊은 맛의 프랑스식 양파 스프" }, en: { name: "Onion Soup", desc: "Deep French onion soup" }, ja: { name: "オニオンスープ", desc: "フランス風のオニオンスープ" }, icon: "🧅", img: "https://images.unsplash.com/photo-1510627489930-0c1b0ba84707?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "팬케이크", desc: "시럽을 곁들인 폭신한 팬케이크" }, en: { name: "Pancakes", desc: "Fluffy pancakes with syrup" }, ja: { name: "パンケーキ", desc: "シロップ付きのふわふわパンケーキ" }, icon: "🥞", img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "셰퍼드 파이", desc: "영국식 고기와 감자 파이" }, en: { name: "Shepherd's Pie", desc: "British meat and potato pie" }, ja: { name: "シェパードパイ", desc: "肉とポテトのイギリス風パイ" }, icon: "🥧", img: "https://images.unsplash.com/photo-1629235483984-754f9d1d1988?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "맥앤치즈", desc: "진한 치즈 소스의 마카로니" }, en: { name: "Mac and Cheese", desc: "Cheesy macaroni dish" }, ja: { name: "マック＆チーズ", desc: "濃厚チーズのマカロニ" }, icon: "🧀", img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "치킨 윙", desc: "매콤하고 바삭한 버팔로 윙" }, en: { name: "Chicken Wings", desc: "Spicy buffalo wings" }, ja: { name: "チキンウィング", desc: "スパイシーな手羽先" }, icon: "🍗", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800" }
    ],
    japanese: [
        { ko: { name: "모둠 초밥", desc: "신선한 재료의 일본 정통 초밥" }, en: { name: "Sushi Platter", desc: "Authentic Japanese sushi" }, ja: { name: "寿司盛り合わせ", desc: "新鮮な日本の伝統的な寿司" }, icon: "🍣", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "돈코츠 라멘", desc: "진한 돼지뼈 국물의 라멘" }, en: { name: "Tonkotsu Ramen", desc: "Rich pork bone broth ramen" }, ja: { name: "豚骨ラーメン", desc: "濃厚な豚骨スープのラーメン" }, icon: "🍜", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "연어 덮밥", desc: "신선한 연어가 가득한 덮밥" }, en: { name: "Salmon Donburi", desc: "Fresh salmon rice bowl" }, ja: { name: "サーモン丼", desc: "新鮮なサーモンたっぷりの丼" }, icon: "🍱", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "텐푸라", desc: "바삭바삭한 일본식 모둠 튀김" }, en: { name: "Tempura", desc: "Crispy Japanese tempura" }, ja: { name: "天ぷら", desc: "サクサクの盛り合わせ天ぷら" }, icon: "🍤", img: "https://images.unsplash.com/photo-1615361413105-6df74ff24381?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "우동", desc: "쫄깃한 면발과 시원한 국물" }, en: { name: "Udon", desc: "Thick wheat noodles in soup" }, ja: { name: "うどん", desc: "モチモチ麺の温かいおうどん" }, icon: "🥣", img: "https://images.unsplash.com/photo-1558985250-27a406d64cb3?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "돈카츠", desc: "두툼한 돼지고기 튀김 요리" }, en: { name: "Tonkatsu", desc: "Crispy breaded pork cutlet" }, ja: { name: "とんかつ", desc: "ジューシーな豚カツ" }, icon: "🐷", img: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "야키토리", desc: "일본식 닭꼬치 구이" }, en: { name: "Yakitori", desc: "Japanese grilled chicken skewers" }, ja: { name: "焼き鳥", desc: "香ばしい焼き鳥" }, icon: "🍢", img: "https://images.unsplash.com/photo-1514516821163-f97b5e8695ee?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "타코야키", desc: "문어가 들어간 동그란 간식" }, en: { name: "Takoyaki", desc: "Octopus balls snack" }, ja: { name: "たこ焼き", desc: "タコの入った丸いおやつ" }, icon: "🐙", img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "오코노미야키", desc: "일본식 양배추 부침 요리" }, en: { name: "Okonomiyaki", desc: "Japanese savory pancake" }, ja: { name: "お好み焼き", desc: "日本のキャベツお好み焼き" }, icon: "🍳", img: "https://images.unsplash.com/photo-1512058560366-cd242945963c?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "우나동", desc: "기력 보충에 좋은 장어 덮밥" }, en: { name: "Unadon", desc: "Grilled eel over rice" }, ja: { name: "うな丼", desc: "元気の出るうなぎ丼" }, icon: "🐍", img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "소바", desc: "구수한 메밀 국수 요리" }, en: { name: "Soba", desc: "Japanese buckwheat noodles" }, ja: { name: "そば", desc: "香ばしい蕎麦料理" }, icon: "🍜", img: "https://images.unsplash.com/photo-1613946221430-e8f0003b512c?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "미소시루", desc: "따뜻하고 구수한 된장국" }, en: { name: "Miso Soup", desc: "Traditional soybean paste soup" }, ja: { name: "味噌汁", desc: "温かいお味噌汁" }, icon: "🥣", img: "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "오니기리", desc: "간편하게 즐기는 주먹밥" }, en: { name: "Onigiri", desc: "Japanese rice balls" }, ja: { name: "おにぎり", desc: "手軽に食べられるおむすび" }, icon: "🍙", img: "https://images.unsplash.com/photo-1616421453447-e23a6c11b068?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "카레라이스", desc: "일본식 진한 카레 요리" }, en: { name: "Curry Rice", desc: "Japanese style curry" }, ja: { name: "カレーライス", desc: "日本風の濃厚なカレー" }, icon: "🍛", img: "https://images.unsplash.com/photo-1631588265089-35438515f949?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "와규 스테이크", desc: "입안에서 녹는 부드러운 와규" }, en: { name: "Wagyu Steak", desc: "Tender melt-in-mouth Wagyu" }, ja: { name: "和牛ステーキ", desc: "口でとろける和牛" }, icon: "🥩", img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "교자", desc: "바삭하고 촉촉한 군만두" }, en: { name: "Gyoza", desc: "Fried and steamed dumplings" }, ja: { name: "餃子", desc: "パリッと焼いた餃子" }, icon: "🥟", img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "오뎅", desc: "따뜻한 국물의 모둠 어묵" }, en: { name: "Oden", desc: "Hot assorted fish cakes" }, ja: { name: "おでん", desc: "温かいおでん盛り合わせ" }, icon: "🍢", img: "https://images.unsplash.com/photo-1547928576-a4a33237ce35?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "스키야키", desc: "달콤한 간장 소스의 소고기 전골" }, en: { name: "Sukiyaki", desc: "Sweet soy beef hot pot" }, ja: { name: "すき焼き", desc: "甘い醤油タレの牛肉鍋" }, icon: "🍲", img: "https://images.unsplash.com/photo-1625938146369-adc83368bca5?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "가이세키", desc: "화려한 일본 정식 요리" }, en: { name: "Kaiseki", desc: "Multi-course Japanese dinner" }, ja: { name: "懐石料理", desc: "華やかな日本のコース料理" }, icon: "🍱", img: "https://images.unsplash.com/photo-1558961363-fa4f29393c9b?auto=format&fit=crop&q=80&w=800" },
        { ko: { name: "오무라이스", desc: "폭신한 계란의 볶음밥" }, en: { name: "Omurice", desc: "Omelet over fried rice" }, ja: { name: "オムライス", desc: "ふわふわ卵のオムライス" }, icon: "🍳", img: "https://images.unsplash.com/photo-1621535222064-21950e30954b?auto=format&fit=crop&q=80&w=800" }
    ]
};

let currentLang = 'ko';
let currentDish = null;

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
    if (body.classList.contains('dark-mode')) {
        themeBtn.textContent = t.lightMode;
    } else {
        themeBtn.textContent = t.darkMode;
    }
    if (currentDish) {
        dishName.textContent = currentDish[lang].name;
        dishDesc.textContent = currentDish[lang].desc;
        dishImg.alt = currentDish[lang].name;
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

        // Disqus Reset Logic
        if (typeof DISQUS !== 'undefined') {
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = currentDish.en.name;
                    this.page.url = window.location.href + '#!' + currentDish.en.name;
                    this.page.title = currentDish.en.name;
                }
            });
        } else {
            // First time loading Disqus
            window.disqus_config = function () {
                this.page.identifier = currentDish.en.name;
                this.page.url = window.location.href + '#!' + currentDish.en.name;
                this.page.title = currentDish.en.name;
            };
            (function() {
                var d = document, s = d.createElement('script');
                s.src = 'https://global-flavor-recommender.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();
        }

        menuDisplay.classList.remove('animate-fade-in');
        void menuDisplay.offsetWidth;
        menuDisplay.classList.add('animate-fade-in');
    });
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') body.classList.add('dark-mode');
updateLanguage('ko');