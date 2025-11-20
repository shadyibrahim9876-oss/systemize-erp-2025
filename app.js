// =====================================
// 1. منطق قائمة التنقل الخاصة بالجوال (Mobile Menu Toggle)
// =====================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.getElementById('main-header');

// منطق فتح/إغلاق القائمة
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// منطق شريط التنقل الثابت (Sticky Header Scroll Logic)
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// =====================================
// 2. منطق تبديل الأسعار (Pricing Toggle Logic) - لصفحة pricing.html
// =====================================

// تحديد العناصر
const priceSwitch = document.querySelector('.pricing-toggle input[type="checkbox"]');
const priceValues = document.querySelectorAll('.price-value .value');
const pricePeriods = document.querySelectorAll('.price-value .period');
const monthlyToggle = document.querySelector('.monthly');
const yearlyToggle = document.querySelector('.yearly');

// أسعار الخطة القياسية والمؤسسات (يجب أن تتطابق مع قيم HTML)
// الشهرية (150 و 250)
const monthlyPrices = [0, 150, 250];
// السنوية (20% خصم تقريبي)
// 150 * 12 * 0.8 = 1440 / 12 = 120 (سعر شهري في الخطة السنوية)
// 250 * 12 * 0.8 = 2400 / 12 = 200 (سعر شهري في الخطة السنوية)
const yearlyPrices = [0, 120, 200]; 


if (priceSwitch) {
    priceSwitch.addEventListener('change', function() {
        const isYearly = this.checked;
        
        // تحديث الـ Toggle Appearance (شهرياً/سنوياً)
        monthlyToggle.classList.toggle('active-toggle', !isYearly);
        yearlyToggle.classList.toggle('active-toggle', isYearly);

        // تحديث الأسعار
        priceValues.forEach((valueElement, index) => {
            // تحديث قيمة السعر
            valueElement.textContent = isYearly ? yearlyPrices[index] : monthlyPrices[index];
        });

        // تحديث فترة السعر
        pricePeriods.forEach(periodElement => {
            periodElement.textContent = isYearly ? '/ مستخدم / سنوياً' : '/ مستخدم / شهرياً';
        });
        
        // تعديل الخطة المجانية التي هي مجانية دائماً
        pricePeriods[0].textContent = '/ شهرياً';
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
            // 1. إزالة التفعيل من جميع الأزرار وتفعيل الزر الحالي
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. الحصول على فئة الفلتر المستهدفة
            const filterValue = button.getAttribute('data-filter');

            // 3. فلترة بطاقات التطبيقات
            appCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block'; // إظهار البطاقة
                } else {
                    card.style.display = 'none'; // إخفاء البطاقة
                }
            });
        });
    });
}
// =====================================
// 4. منطق البحث في التطبيقات والمدونة (Search Logic)
// =====================================

// تحديد مربعات البحث في كلا الصفحتين
const searchInputs = document.querySelectorAll('.search-box input');

searchInputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // التحقق مما إذا كنا في صفحة التطبيقات
        if (document.getElementById('apps-marketplace')) {
            filterAppCards(searchTerm);
        } 
        // التحقق مما إذا كنا في صفحة المدونة
        else if (document.getElementById('blog-page')) {
            filterBlogPosts(searchTerm);
        }
    });
});

// وظيفة فلترة بطاقات التطبيقات حسب كلمة البحث
function filterAppCards(term) {
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(card => {
        // البحث في عنوان التطبيق والوصف
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('.app-description').textContent.toLowerCase();
        
        if (title.includes(term) || description.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// وظيفة فلترة مقالات المدونة حسب كلمة البحث
function filterBlogPosts(term) {
    const blogPosts = document.querySelectorAll('.blog-post-card');
    
    blogPosts.forEach(post => {
        // البحث في عنوان المقال والمقتطف
        const title = post.querySelector('h3 a').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        
        if (title.includes(term) || excerpt.includes(term)) {
            post.style.display = 'flex'; // استخدام display: flex لأن هذا هو التنسيق الأصلي لبطاقة المقال
        } else {
            post.style.display = 'none';
        }
    });
}

// =====================================
// ملاحظة: لكي يعمل هذا المنطق، يجب أن يحتوي HTML على القيم الأولية الصحيحة
// =====================================