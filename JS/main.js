// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initHeaderScroll();
    initMobileMenu();
    initTheme(); // Adicionado - tema dark/light
    initTyped();
    initAOS();
    initSkillBars();
    initProjectFilter();
    initFormValidation();
    initScrollSpy();
    initParallax();
    initSmoothScroll();
    initContactForm();
    initCounters();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500);
    });
}

// ===== CURSOR PERSONALIZADO =====
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    // Efeitos em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ===== HEADER SCROLL =====
function initHeaderScroll() {
    const header = document.getElementById('header');
    const scrollUp = document.getElementById('scroll-up');
    
    window.addEventListener('scroll', () => {
        // Header background
        if (window.scrollY > 100) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
        
        // Scroll Up button
        if (window.scrollY >= 500) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    });
}

// ===== SCROLL UP =====
document.getElementById('scroll-up')?.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== MENU MOBILE =====
function initMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });
}

// ===== THEME TOGGLE (DARK/LIGHT) =====
function initTheme() {
    const themeButton = document.getElementById('theme-button');
    const themeIcon = themeButton.querySelector('.theme-icon');
    const darkThemeClass = 'dark-theme';
    const iconTheme = 'fa-sun';
    
    // Tema preferido do usuário (salvo ou preferência do sistema)
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('selected-theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Verifica preferência do sistema
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    // Define o tema inicial
    const setInitialTheme = () => {
        const theme = getPreferredTheme();
        if (theme === 'dark') {
            document.body.classList.add(darkThemeClass);
            themeIcon.classList.replace('fa-moon', iconTheme);
        } else {
            document.body.classList.remove(darkThemeClass);
            themeIcon.classList.replace(iconTheme, 'fa-moon');
        }
    };
    
    setInitialTheme();
    
    // Alterna tema ao clicar no botão
    themeButton.addEventListener('click', () => {
        // Alterna classe do tema
        document.body.classList.toggle(darkThemeClass);
        
        // Alterna ícone
        if (document.body.classList.contains(darkThemeClass)) {
            themeIcon.classList.replace('fa-moon', iconTheme);
            localStorage.setItem('selected-theme', 'dark');
            localStorage.setItem('selected-icon', iconTheme);
            
            // Atualiza meta theme-color para dark
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1a1b2f');
        } else {
            themeIcon.classList.replace(iconTheme, 'fa-moon');
            localStorage.setItem('selected-theme', 'light');
            localStorage.setItem('selected-icon', 'fa-moon');
            
            // Atualiza meta theme-color para light
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#4361ee');
        }
        
        // Animação no botão
        themeButton.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeButton.style.transform = 'rotate(0)';
        }, 300);
    });
    
    // Observa mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('selected-theme')) {
            if (e.matches) {
                document.body.classList.add(darkThemeClass);
                themeIcon.classList.replace('fa-moon', iconTheme);
                document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1a1b2f');
            } else {
                document.body.classList.remove(darkThemeClass);
                themeIcon.classList.replace(iconTheme, 'fa-moon');
                document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#4361ee');
            }
        }
    });
}

// ===== TYPED TEXT =====
function initTyped() {
    const typed = new Typed('.typed-text', {
        strings: [
            'Desenvolvedor Full-Stack',
            'Estudante FIAP',
            'Apaixonado por Tecnologia',
            'Criador de Soluções'
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        backDelay: 2000,
        startDelay: 1000,
        showCursor: false
    });
}

// ===== AOS ANIMATION =====
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

// ===== SKILL BARS =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== PROJECT FILTER =====
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'Este campo é obrigatório');
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                showError(input, 'Email inválido');
            } else {
                removeError(input);
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>Enviando...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso!', 'success');
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const formGroup = input.closest('.form__group');
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function removeError(input) {
    const formGroup = input.closest('.form__group');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        const formMessage = document.getElementById('form-message');
        const submitBtn = document.getElementById('submit-btn');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Guarda o texto original do botão
            const originalText = submitBtn.innerHTML;
            
            // Mostra loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Sucesso
                    showMessage('success', '✓ Mensagem enviada com sucesso! Entrarei em contato em breve.');
                    form.reset(); // Limpa o formulário
                } else {
                    // Erro
                    const data = await response.json();
                    throw new Error(data.error || 'Erro ao enviar');
                }
            } catch (error) {
                // Mostra erro
                showMessage('error', '✗ Erro ao enviar. Por favor, tente novamente.');
            }
            
            // Restaura o botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
        
        // Função para mostrar mensagens
        function showMessage(type, text) {
            formMessage.className = `form__message ${type}`;
            formMessage.textContent = text;
            formMessage.style.display = 'block';
            
            // Remove a mensagem após 5 segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// ===== COUNT NUMBERS =====
function initCounters() {
    const counters = document.querySelectorAll('.about__info-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.innerText);
                let count = 0;
                
                const updateCounter = () => {
                    if (count < target) {
                        count += Math.ceil(target / 50);
                        counter.innerText = count + '+';
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== LAZY LOADING IMAGES =====
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===== DETECTA MUDANÇA DE TEMA PARA ATUALIZAR GRÁFICOS =====
// Útil se você tiver canvas ou elementos que precisam ser redesenhados
const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && mutation.target === document.body) {
            // Dispara evento customizado para outros componentes
            const event = new CustomEvent('themeChange', {
                detail: {
                    theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light'
                }
            });
            window.dispatchEvent(event);
        }
    });
});

themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
});