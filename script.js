// Конфигурация Telegram бота
const BOT_TOKEN = "8572033180:AAG1EGXLNowtTfypEp8zxy80zFxXn-icHxQ";
const CHAT_ID = "6585906898";

// Функция отправки сообщения в Telegram
async function sendToTelegram(message) {
    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        console.log('Telegram response:', data);
        return data.ok;
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        return false;
    }
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        link.classList.add('active');
        
        // Scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu if open
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal functions
function showCourseModal(courseName = '') {
    const modal = document.getElementById('courseModal');
    const modalTitle = document.getElementById('modalTitle');
    const courseSelect = document.getElementById('courseSelect');
    
    if (courseName) {
        modalTitle.textContent = `${courseName} kursiga yozilish`;
        // Set the select value based on course name
        const courseMap = {
            "Boshlang'ich Daraja": "boshlangich",
            "O'rta Daraja": "orta", 
            "Ilg'or Daraja": "ilgor",
            "Maxsus Kurslar": "maxsus",
            
            "Xalqaro Sertifikat": "sertifikat"
        };
        if (courseSelect && courseMap[courseName]) {
            courseSelect.value = courseMap[courseName];
        }
    } else {
        modalTitle.textContent = 'Arab Tili Kursiga Yozilish';
    }
    
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('courseModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Form handling for course modal
const courseForm = document.getElementById('courseForm');
if (courseForm) {
    courseForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const data = {
            name: this.querySelector('input[type="text"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            email: this.querySelector('input[type="email"]').value || 'Не указан',
            course: this.querySelector('select').value
        };
        
        // Формируем сообщение для Telegram
        const telegramMessage = `
📝 <b>YANGI ARAB TILI KURSI ARIZASI</b>

👤 <b>Ism:</b> ${data.name}
📞 <b>Telefon:</b> ${data.phone}
📧 <b>Email:</b> ${data.email}
🎓 <b>Kurs:</b> ${data.course}
⏰ <b>Vaqt:</b> ${new Date().toLocaleString()}
🌐 <b>Manba:</b> Shams Ta'lim Markazi
        `;
        
        // Показываем загрузку
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Yuborilmoqda...';
        submitBtn.disabled = true;
        
        // Отправляем в Telegram
        const success = await sendToTelegram(telegramMessage);
        
        if (success) {
            alert('✅ Arizangiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
            closeModal();
            this.reset();
        } else {
            alert('❌ Yuborishda xatolik. Iltimos, bizga qo\'ng\'iroq qiling.');
        }
        
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Form handling for contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const data = {
            name: this.querySelector('input[type="text"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            course: this.querySelector('select').value,
            message: this.querySelector('textarea').value || 'Ko\'rsatilmagan'
        };
        
        // Формируем сообщение для Telegram
        const telegramMessage = `
📩 <b>SAYTDAN YANGI XABAR</b>

👤 <b>Ism:</b> ${data.name}
📞 <b>Telefon:</b> ${data.phone}
🎓 <b>Qiziqgan kurs:</b> ${data.course}
💬 <b>Xabar:</b> ${data.message}
⏰ <b>Vaqt:</b> ${new Date().toLocaleString()}
🌐 <b>Manba:</b> Shams Ta'lim Markazi
        `;
        
        // Показываем загрузку
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Yuborilmoqda...';
        submitBtn.disabled = true;
        
        // Отправляем в Telegram
        const success = await sendToTelegram(telegramMessage);
        
        if (success) {
            alert('✅ Xabaringiz yuborildi! Tez orada siz bilan bog\'lanamiz.');
            this.reset();
        } else {
            alert('❌ Yuborishda xatolik. Iltimos, bizga qo\'ng\'iroq qiling.');
        }
        
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Функция для отслеживания посещений
function trackVisit() {
    const visitData = `
👀 <b>SAYTDA YANGI TASHRIBACHI</b>

🌐 <b>Sayt:</b> Shams Ta'lim Markazi
🕒 <b>Vaqt:</b> ${new Date().toLocaleString()}
📱 <b>Qurilma:</b> ${navigator.userAgent.split(' ')[0]}
    `;
    
    // Отправляем информацию о посещении
    sendToTelegram(visitData);
}

// Отслеживаем клики по кнопкам "Batafsil"
document.querySelectorAll('.btn-outline').forEach(button => {
    button.addEventListener('click', function() {
        const courseCard = this.closest('.course-card');
        if (courseCard) {
            const courseName = courseCard.querySelector('h3').textContent;
            const message = `
🎯 <b>FOYDALANUVCHI KURSGA QIZIQDI</b>

📚 <b>Kurs:</b> ${courseName}
🕒 <b>Vaqt:</b> ${new Date().toLocaleString()}
🌐 <b>Manba:</b> Shams Ta'lim Markazi
            `;
            
            sendToTelegram(message);
        }
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add some animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.course-card, .teacher-card, .stat-item, .result-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Отправляем уведомление о новом посещении через 5 секунд
    setTimeout(() => {
        trackVisit();
    }, 5000);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Shams Ta\'lim Markazi Arab Tili Kurslari website loaded successfully');
});