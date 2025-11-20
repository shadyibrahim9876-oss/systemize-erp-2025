// assets/js/app.js
// Systemize ERP & Tax 2025 - كل الـ Magic في ملف واحد

document.addEventListener("DOMContentLoaded", function () {
  // 1. Dark/Light Mode + حفظ الاختيار
  const themeBtn = document.getElementById("theme-toggle");
  const sun = "fa-sun", moon = "fa-moon";

  function setTheme(theme) {
    if (theme === "light") {
      document.documentElement.classList.add("light");
      themeBtn.innerHTML = `<i class="fas ${moon}"></i>`;
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      themeBtn.innerHTML = `<i class="fas ${sun}"></i>`;
      localStorage.setItem("theme", "dark");
    }
  }

  // تحميل الثيم المحفوظة
  if (localStorage.getItem("theme") === "light" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: light)").matches)) {
    setTheme("light");
  }

  window.toggleTheme = function () {
    if (document.documentElement.classList.contains("light")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // 2. Mega Menu
  const appsLink = document.querySelector('a[href="#apps"]');
  const megaMenu = document.getElementById("mega-menu");

  if (appsLink && megaMenu) {
    appsLink.addEventListener("mouseenter", () => megaMenu.classList.add("active"));
    document.querySelector("header").addEventListener("mouseleave", () => megaMenu.classList.remove("active"));
  }

  // 3. Pricing Toggle (شهري / سنوي)
  window.togglePricing = function () {
    document.querySelectorAll(".price-monthly").forEach(el => el.classList.toggle("hidden"));
    document.querySelectorAll(".price-yearly").forEach(el => el.classList.toggle("hidden"));
    document.querySelectorAll(".toggle-circle").forEach(circle => circle.classList.toggle("translate-x-8"));
  };

  // 4. Confetti لما حد يضغط "ابدأ مجاناً"
  document.querySelectorAll(".confetti-trigger").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00b894', '#00cec9', '#ff6e7f', '#a29bfe', '#f8d05a']
      });
      setTimeout(() => {
        window.location.href = "https://systemize.tax/register";
      }, 800);
    });
  });

  // 5. Header Scroll Effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      document.querySelector("header").classList.add("scrolled");
    } else {
      document.querySelector("header").classList.remove("scrolled");
    }
  });

  // 6. تغيير اللغة (بسيط جدًا وسريع)
  window.switchLang = function () {
    const current = document.documentElement.lang;
    if (current === "ar") {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
      document.body.classList.add("en");
      document.querySelector('[onclick="switchLang()"]').textContent = "عر";
    } else {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
      document.body.classList.remove("en");
      document.querySelector('[onclick="switchLang()"]').textContent = "EN";
    }
  };
});