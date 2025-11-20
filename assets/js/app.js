// =====================================
// 1. منطق قائمة التنقل الخاصة بالجوال (Mobile Menu Toggle)
// =====================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.getElementById('main-header');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// منطق شريط التنقل الثابت (Sticky Header Scroll Logic)
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}


// =====================================
// 2. منطق تبديل الأسعار (Pricing Toggle Logic) - لصفحة pricing.html
// =====================================
const priceSwitch = document.querySelector('.pricing-toggle input[type="checkbox"]');
const priceValues = document.querySelectorAll('.price-value .value');
const pricePeriods = document.querySelectorAll('.price-value .period');
const monthlyToggle = document.querySelector('.monthly');
const yearlyToggle = document.querySelector('.yearly');

const monthlyPrices = [0, 150, 250];
const yearlyPrices = [0, 120, 200]; 

if (priceSwitch) {
    priceSwitch.addEventListener('change', function() {
        const isYearly = this.checked;
        
        monthlyToggle.classList.toggle('active-toggle', !isYearly);
        yearlyToggle.classList.toggle('active-toggle', isYearly);

        priceValues.forEach((valueElement, index) => {
            valueElement.textContent = isYearly ? yearlyPrices[index] : monthlyPrices[index];
        });

        pricePeriods.forEach(periodElement => {
            periodElement.textContent = isYearly ? '/ مستخدم / سنوياً' : '/ مستخدم / شهرياً';
        });
        
        // تعديل الخطة المجانية التي هي مجانية دائماً
        if (pricePeriods[0]) {
            pricePeriods[0].textContent = '/ شهرياً';
        }
    });
}


// =====================================
// 3. منطق فلترة التطبيقات (Apps Marketplace Filtering)
// =====================================
const filterButtons = document.querySelectorAll('.filter-btn');
const appCards = document.querySelectorAll('.app-card');

if (filterButtons.length > 0 && appCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            appCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}


// =====================================
// 4. منطق البحث في التطبيقات والمدونة (Search Logic)
// =====================================
const searchInputs = document.querySelectorAll('.search-box input');

searchInputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (document.getElementById('apps-marketplace')) {
            filterAppCards(searchTerm);
        } else if (document.getElementById('blog-page')) {
            filterBlogPosts(searchTerm);
        }
    });
});

function filterAppCards(term) {
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('.app-description').textContent.toLowerCase();
        if (title.includes(term) || description.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterBlogPosts(term) {
    const blogPosts = document.querySelectorAll('.blog-post-card');
    blogPosts.forEach(post => {
        // نستخدم flex هنا لأن التنسيق الأصلي للبطاقة هو flex
        const displayStyle = window.innerWidth <= 900 ? 'column' : 'flex'; 
        
        const title = post.querySelector('h3 a').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        
        if (title.includes(term) || excerpt.includes(term)) {
            post.style.display = displayStyle;
        } else {
            post.style.display = 'none';
        }
    });
}


// =====================================
// 5. منطق تغيير اللغة (Language Switcher & i18n)
// =====================================
const langSwitcher = document.getElementById('language-switcher');

async function fetchTranslations(lang) {
    try {
        const response = await fetch(`assets/i18n/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Could not load translations for ${lang}`);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return {};
    }
}

async function applyTranslations(lang) {
    const translations = await fetchTranslations(lang);
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    const body = document.body;
    
    // 1. تحديث النصوص
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n');
        // استخدام innerHTML لدعم علامات HTML داخل الترجمة (مثل <br>)
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });

    // 2. تحديث الاتجاه والتنسيق (RTL/LTR)
    if (lang === 'ar') {
        body.setAttribute('dir', 'rtl');
        // يمكننا إضافة فئة خاصة لتعديلات CSS المعقدة
        body.classList.remove('ltr-mode'); 
    } else {
        body.setAttribute('dir', 'ltr');
        // إضافة فئة LTR-mode
        body.classList.add('ltr-mode'); 
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // تحديد اللغة الافتراضية
    const storedLang = localStorage.getItem('siteLang') || 'ar'; 
    if (langSwitcher) {
        langSwitcher.value = storedLang; // تعيين قيمة القائمة المنسدلة
        applyTranslations(storedLang);
        
        langSwitcher.addEventListener('change', (e) => {
            const newLang = e.target.value;
            localStorage.setItem('siteLang', newLang); // حفظ الاختيار
            applyTranslations(newLang);
        });
    } else {
        // إذا لم يكن هناك مبدل لغة (كما في صفحات فرعية لم نعدلها)، يتم تحميل الافتراضية
        applyTranslations(storedLang); 
    }
});