// ========================================
// CONFIGURACIÓN INICIAL
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initCube3D();
    initFAQ();
    initAnimations();
    initMentorButton();
});

// ========================================
// NAVBAR
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 29, 41, 0.98)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(26, 29, 41, 0.95)';
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Mobile menu toggle
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    });
}

// ========================================
// CUBO 3D INTERACTIVO
// ========================================
function initCube3D() {
    const cube = document.getElementById('cube3d');
    const cubeButtons = document.querySelectorAll('.cube-btn');
    
    if (!cube) return;
    
    let rotationX = -15;
    let rotationY = 0;
    let autoRotate = true;
    let animationId;
    
    // Rotación automática
    function startAutoRotation() {
        if (!autoRotate) return;
        
        animationId = requestAnimationFrame(function animate() {
            rotationY += 0.3;
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            
            if (autoRotate) {
                animationId = requestAnimationFrame(animate);
            }
        });
    }
    
    function stopAutoRotation() {
        autoRotate = false;
        cancelAnimationFrame(animationId);
    }
    
    // Pausar rotación al hover
    cube.addEventListener('mouseenter', function() {
        stopAutoRotation();
    });
    
    cube.addEventListener('mouseleave', function() {
        autoRotate = true;
        startAutoRotation();
    });
    
    // Control manual con mouse drag
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    
    cube.addEventListener('mousedown', function(e) {
        isDragging = true;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
        stopAutoRotation();
        cube.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        
        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.3;
        
        // Limitar rotación X
        rotationX = Math.max(-90, Math.min(30, rotationX));
        
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            cube.style.cursor = 'grab';
            setTimeout(() => {
                autoRotate = true;
                startAutoRotation();
            }, 1000);
        }
    });
    
    // Controles de botones
    cubeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rotation = this.getAttribute('data-rotation');
            stopAutoRotation();
            
            switch(rotation) {
                case 'front':
                    rotateToFace(0);
                    break;
                case 'right':
                    rotateToFace(90);
                    break;
                case 'back':
                    rotateToFace(180);
                    break;
                case 'left':
                    rotateToFace(-90);
                    break;
                case 'pause':
                    autoRotate = !autoRotate;
                    if (autoRotate) {
                        this.querySelector('i').className = 'fas fa-pause';
                        startAutoRotation();
                    } else {
                        this.querySelector('i').className = 'fas fa-play';
                    }
                    break;
            }
        });
    });
    
    function rotateToFace(targetY) {
        const duration = 1000;
        const startY = rotationY;
        const startX = rotationX;
        const targetX = -15;
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (easeInOutCubic)
            const eased = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            rotationY = startY + (targetY - startY) * eased;
            rotationX = startX + (targetX - startX) * eased;
            
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    autoRotate = true;
                    startAutoRotation();
                }, 2000);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Iniciar rotación automática
    startAutoRotation();
    
    // Touch support para móviles
    let touchStartX = 0;
    let touchStartY = 0;
    
    cube.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        stopAutoRotation();
    });
    
    cube.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        
        rotationY += deltaX * 0.3;
        rotationX -= deltaY * 0.2;
        
        rotationX = Math.max(-90, Math.min(30, rotationX));
        
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        
        touchStartX = touchX;
        touchStartY = touchY;
    });
    
    cube.addEventListener('touchend', function() {
        setTimeout(() => {
            autoRotate = true;
            startAutoRotation();
        }, 1000);
    });
}

// ========================================
// FAQ ACCORDION
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                }
            });
            
            // Toggle item actual
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Abrir primer item por defecto
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        firstItem.classList.add('active');
        const firstAnswer = firstItem.querySelector('.faq-answer');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }
}

// ========================================
// ANIMACIONES DE SCROLL (AOS - Animate On Scroll)
// ========================================
function initAnimations() {
    // Inicializar AOS library si está disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
    
    // Parallax effect para el hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Animación de números (counter)
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const number = parseInt(target.replace(/\D/g, ''));
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
            }
        }, 16);
    }
    
    // Hover effects para cards
    const cards = document.querySelectorAll('.module-card, .spec-card, .launch-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efecto de typing para el título hero (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.dataset.typing === 'true') {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }
}

// ========================================
// MENTOR IA BUTTON & CHATBOT
// ========================================
function initMentorButton() {
    const mentorBtn = document.getElementById('mentorBtn');
    const chatbotModal = document.getElementById('chatbotModal');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMinimize = document.getElementById('chatbotMinimize');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    if (!mentorBtn || !chatbotModal) return;
    
    // Abrir chatbot
    mentorBtn.addEventListener('click', function() {
        chatbotModal.classList.add('active');
        mentorBtn.style.display = 'none';
        chatbotInput.focus();
    });
    
    // Cerrar chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotModal.classList.remove('active');
        mentorBtn.style.display = 'flex';
    });
    
    // Minimizar chatbot
    chatbotMinimize.addEventListener('click', function() {
        chatbotModal.classList.remove('active');
        mentorBtn.style.display = 'flex';
    });
    
    // Enviar mensaje
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Agregar mensaje del usuario
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Simular respuesta del bot
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
    
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Agregar mensaje al chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Respuestas del bot
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('odoo') || lowerMessage.includes('curso')) {
            return '¡Excelente pregunta! 🎓 Nuestro Plan Completo Odoo incluye más de 150 cursos sobre todos los módulos: Facturación, Inventario, CRM, Sitio Web y muchos más. ¿Te gustaría conocer algún módulo en particular?';
        }
        
        if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('plan')) {
            return '💰 Tenemos 2 planes:<br>• <strong>Plan Basic</strong>: S/149/mes<br>• <strong>Plan Expert</strong>: S/669/año (ahorras S/221)<br><br>El Plan Expert incluye certificados físicos, eventos exclusivos y más. ¿Quieres más detalles?';
        }
        
        if (lowerMessage.includes('certificado') || lowerMessage.includes('certificación')) {
            return '📜 ¡Sí! Todos nuestros cursos incluyen certificados digitales. Con el Plan Expert también recibes certificados físicos para las rutas de aprendizaje profesional. Son reconocidos por empresas que valoran la capacitación práctica.';
        }
        
        if (lowerMessage.includes('profesor') || lowerMessage.includes('instructor')) {
            return '👨‍🏫 Nuestros profesores son expertos con experiencia real implementando Odoo en empresas. Todos trabajan activamente en la industria y comparten casos prácticos del mundo real.';
        }
        
        if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas')) {
            return '¡Hola! 👋 ¿En qué puedo ayudarte hoy? Puedo resolver dudas sobre:<br>• Cursos de Odoo<br>• Planes y precios<br>• Certificaciones<br>• Nuestros profesores<br>• Modalidad de estudio';
        }
        
        if (lowerMessage.includes('gracias')) {
            return '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte? Estoy aquí para resolver todas tus dudas sobre nuestros cursos de Odoo.';
        }
        
        // Respuesta por defecto
        return '🤔 Interesante pregunta. Te recomiendo contactar directamente a nuestro equipo de soporte para una respuesta más detallada. También puedes revisar nuestra sección de <strong>Preguntas Frecuentes</strong> más abajo. ¿Hay algo más en lo que pueda ayudarte?';
    }
    
    // Efecto de aparecer al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            if (!chatbotModal.classList.contains('active')) {
                mentorBtn.style.opacity = '1';
                mentorBtn.style.pointerEvents = 'auto';
            }
        } else {
            mentorBtn.style.opacity = '0';
            mentorBtn.style.pointerEvents = 'none';
        }
    });
    
    // Inicialmente oculto
    mentorBtn.style.opacity = '0';
    mentorBtn.style.pointerEvents = 'none';
    mentorBtn.style.transition = 'opacity 0.3s ease';
}

// ========================================
// UTILIDADES
// ========================================

// Debounce function para optimizar eventos de scroll
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Lazy loading para imágenes
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

// ========================================
// ANALYTICS & TRACKING (opcional)
// ========================================
function trackEvent(category, action, label) {
    // Integración con Google Analytics o similar
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track clicks en botones importantes
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-cta')) {
        trackEvent('CTA', 'Click', 'Conoce nuestros planes');
    }
    
    if (e.target.closest('.btn-pricing')) {
        const planName = e.target.closest('.pricing-card').querySelector('h3').textContent;
        trackEvent('Pricing', 'Click', planName);
    }
    
    if (e.target.closest('.btn-launch')) {
        const courseName = e.target.closest('.launch-card').querySelector('h3').textContent;
        trackEvent('Course', 'Click', courseName);
    }
});

// ========================================
// BÚSQUEDA EN TIEMPO REAL
// ========================================
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length < 2) return;
        
        // Aquí puedes implementar búsqueda real
        console.log(`Buscando: ${searchTerm}`);
        
        // Ejemplo: filtrar módulos
        const modules = document.querySelectorAll('.module-card');
        modules.forEach(module => {
            const title = module.querySelector('h3').textContent.toLowerCase();
            const description = module.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                module.style.display = 'block';
            } else {
                module.style.display = 'none';
            }
        });
    }, 300));
}

// ========================================
// MODAL PARA VER DEMO (opcional)
// ========================================
function createVideoModal() {
    const demoButtons = document.querySelectorAll('.btn-outline');
    
    demoButtons.forEach(button => {
        if (button.textContent.includes('Ver demo')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Crear modal
                const modal = document.createElement('div');
                modal.className = 'video-modal';
                modal.innerHTML = `
                    <div class="video-modal-content">
                        <button class="video-modal-close">&times;</button>
                        <div class="video-container">
                            <iframe width="100%" height="100%" 
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Cerrar modal
                const closeBtn = modal.querySelector('.video-modal-close');
                closeBtn.addEventListener('click', function() {
                    modal.remove();
                });
                
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
            });
        }
    });
}

// Inicializar modal de video
createVideoModal();

// ========================================
// SISTEMA DE NOTIFICACIONES
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Agregar estilos dinámicos si no existen
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            .notification-success { border-left: 4px solid #4caf50; }
            .notification-info { border-left: 4px solid #2196f3; }
            .notification-warning { border-left: 4px solid #ff9800; }
            .notification-error { border-left: 4px solid #f44336; }
            
            .notification i { font-size: 1.5rem; }
            .notification-success i { color: #4caf50; }
            .notification-info i { color: #2196f3; }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
                margin-left: auto;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Agregar animación de salida
const slideOutAnimation = document.createElement('style');
slideOutAnimation.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(slideOutAnimation);

// ========================================
// PRELOADER (opcional)
// ========================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

console.log('🚀 Escuela FULLSTACK - Website Loaded Successfully!');
