// === BOYU | 星际语言核心 (Universal Translator) ===

const translations = {
    "en": {
        // --- [全局导航] ---
        "nav.about": "ABOUT",
        "nav.projects": "PROJECTS",
        "nav.blog": "BLOG",
        "nav.system": "SYSTEM",
        "nav.sys.visuals": "// VISUAL LOGS",
        "nav.sys.repo": "// REPOSITORY",
        "nav.sys.rss": "// RSS FEED",
        "nav.join": "JOIN CREW",
        "nav.back": "← RETURN TO BASE", // 返回按钮

        // --- [首页 Index] ---
        "hero.title": "ASTRAL<br>FRONTIER",
        "about.intro": "I am BOYU. A <strong>Trader</strong> and <strong>World Explorer</strong>.",
        "about.desc": "Dedicated to building a trusted digital world (Ethicraft) and a more reliable self.<br><br>Beyond the rise and fall of K-lines, I immerse myself in the fjords of <strong>Norway</strong>, the music of Ólafur Arnalds, and the bliss of a duo world. This site is not a code repo, but a log of wealth logic and life aesthetics.<br><br>Recording all thoughts, failures, epiphanies, and growth. Learning to find direction in chaos.",
        "btn.contact": "CONTACT ME",
        "proj.ethicraft.desc": "A permanently free Web3 learning and certification platform.",
        "proj.pa.desc": "Naked K-line trading system and psychology notes.",
        "proj.iceland.desc": "Visual records of solitude, wastelands, and auroras.",
        "blog.readall": "READ ALL ->",
        "optics.enter": "ENTER GALLERY",
        "nexus.title": "REGISTER TO NEURAL LINK",
        "nexus.desc": "Register as an observer of the [BOYU] node. Receive the latest trading strategies and interstellar visuals first.",
        "btn.activate": "ACTIVATE ACCOUNT",
        "nexus.fuel": "FUEL THE SHIP",
        "btn.sponsor": "SPONSOR ME",

        // --- [旅行页 Travel] ---
        "world.title": "WORLD ARCHIVE",
        "world.desc": "Measuring the dimensions of the world with a lens. From tropical steel forests to polar ice wastelands.",
        "filter.all": "ALL // VIEW ALL",
        "filter.sg": "SINGAPORE // LION CITY",
        "filter.cn": "CHINA // HOMELAND",
        "filter.ice": "ICELAND // THE NORTH",
        "card.read": "READ LOG"
    },
    "zh": {
        // --- [全局导航] ---
        "nav.about": "关于",
        "nav.projects": "项目",
        "nav.blog": "博客",
        "nav.system": "系统",
        "nav.sys.visuals": "// 影像日志",
        "nav.sys.repo": "// 代码仓库",
        "nav.sys.rss": "// RSS 订阅",
        "nav.join": "加入舰队",
        "nav.back": "← 返回基地", // 返回按钮

        // --- [首页 Index] ---
        "hero.title": "星界<br>边境",
        "about.intro": "我是 BOYU。一名<strong>交易员</strong>与<strong>世界探索者</strong>。",
        "about.desc": "致力于构建一个可信的数字世界 (Ethicraft) 和一个更可靠的自己。<br><br>在 K 线的涨跌之外，我沉浸于<strong>挪威</strong>的峡湾、Ólafur Arnalds 的音乐，以及幸福的二人世界。这个站点不是代码仓库，而是记录财富逻辑与生活美学的航海日志。<br><br>记录所有思考、失败、顿悟和成长，学习如何在混沌里找到方向。",
        "btn.contact": "联系我",
        "proj.ethicraft.desc": "永久免费的 Web3 学习与考试认证平台。",
        "proj.pa.desc": "裸K交易系统与心态磨砺笔记。",
        "proj.iceland.desc": "关于孤独、荒原与极光的影像记录。",
        "blog.readall": "查看全部 ->",
        "optics.enter": "进入画廊",
        "nexus.title": "注册神经网络链接",
        "nexus.desc": "注册成为 [BOYU] 节点的观察者。第一时间接收最新的交易策略与星际影像。",
        "btn.activate": "激活账号",
        "nexus.fuel": "为飞船注能",
        "btn.sponsor": "赞助我",

        // --- [旅行页 Travel] ---
        "world.title": "世界档案",
        "world.desc": "用镜头丈量世界的维度。从热带的钢铁森林，到极地的冰原荒野。",
        "filter.all": "全部 // ALL",
        "filter.sg": "新加坡 // SINGAPORE",
        "filter.cn": "中国 // CHINA",
        "filter.ice": "冰岛 // ICELAND",
        "card.read": "阅读日志"
    }
};

// 核心逻辑 (自动运行)
document.addEventListener("DOMContentLoaded", () => {
    let currentLang = localStorage.getItem('site-lang') || 'en'; 
    updateContent(currentLang);
});

// 全局切换函数
function toggleLanguage() {
    let currentLang = localStorage.getItem('site-lang') || 'en';
    let newLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('site-lang', newLang);
    updateContent(newLang);
}

function updateContent(lang) {
    // 1. 更新滑块状态 (如果页面上有的话)
    const switchContainer = document.querySelector('.lang-switch-container');
    const textEn = document.querySelector('.lang-text.left');
    const textZh = document.querySelector('.lang-text.right');
    
    if(switchContainer) {
        if (lang === 'en') {
            switchContainer.classList.remove('lang-zh-mode');
            if(textEn) textEn.style.color = '#000';
            if(textZh) textZh.style.color = '#666';
        } else {
            switchContainer.classList.add('lang-zh-mode');
            if(textEn) textEn.style.color = '#666';
            if(textZh) textZh.style.color = '#000';
        }
    }

    // 2. 替换文本
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if(el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.placeholder = translations[lang][key];
            } else {
                // 检查是否包含HTML标签，如果有则使用innerHTML，否则innerText
                if (translations[lang][key].includes('<')) {
                    el.innerHTML = translations[lang][key];
                } else {
                     // 针对按钮内有图标的情况，只替换文字节点，比较复杂，
                     // 这里简化处理：直接替换 innerHTML，但要求字典里把图标代码也带上，或者只翻译纯文本节点。
                     // 简单起见，直接替换 innerHTML。
                    el.innerHTML = translations[lang][key];
                }
            }
        }
    });
}
