//
// =====================================
// 1. منطق قائمة التنقل الخاصة بالجوال (Mobile Menu Toggle)
// =====================================
//

// اختيار الأزرار والعناصر الرئيسية
const menuToggle = document.querySelector('.menu-toggle'); // زر القائمة (☰)
const navLinks = document.querySelector('.nav-links');     // قائمة الروابط

// إضافة مستمع للحدث (Event Listener) عند النقر على الزر
menuToggle.addEventListener('click', () => {
    // تبديل الفئة (Class) بين 'active' و 'inactive'
    // هذه الفئة سيتم استخدامها في CSS لإظهار أو إخفاء القائمة
    navLinks.classList.toggle('active');
    
    // يمكنك تعديل نص الزر أو أيقونته هنا
    if (navLinks.classList.contains('active')) {
        menuToggle.textContent = '✕'; // تغيير الأيقونة إلى علامة إغلاق
    } else {
        menuToggle.textContent = '☰'; // إعادة الأيقونة إلى الخطوط الثلاثة
    }
});


//
// =====================================
// 2. منطق شريط التنقل الثابت (Sticky Header Scroll Logic)
// =====================================
//

const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    // إضافة فئة 'scrolled' إذا تجاوز التمرير 50 بكسل
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});