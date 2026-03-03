document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const statusImage = document.getElementById('statusImage');
    const statusText = document.getElementById('statusText');
    const statusDot = document.getElementById('statusDot');
    const statusAvatar = document.querySelector('.status-avatar');
    const cursorGlow = document.getElementById('cursor-glow');
    const scrollProgress = document.getElementById('scroll-progress');

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
        createParticles();
    }, 2000);

    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = '#00FF88';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.5;
            particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
            particlesContainer.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                }
                50% {
                    transform: translateY(-20px) translateX(20px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    function checkOnlineStatus() {
        const isAdmin = localStorage.getItem('ediza10_admin');
        const lastActive = localStorage.getItem('ediza10_last_active');
        const now = Date.now();
        const timeout = 60000;

        if (isAdmin === 'true' && lastActive && (now - parseInt(lastActive)) < timeout) {
            setOnlineStatus();
        } else {
            setOfflineStatus();
        }
    }

    function setOnlineStatus() {
        statusImage.src = 'https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg?auto=compress&cs=tinysrgb&w=400';
        statusText.textContent = 'Ediza_10 is Online';
        statusDot.classList.remove('offline');
        statusAvatar.classList.remove('offline');
    }

    function setOfflineStatus() {
        statusImage.src = 'https://images.pexels.com/photos/1028637/pexels-photo-1028637.jpeg?auto=compress&cs=tinysrgb&w=400';
        statusText.textContent = 'Ediza_10 is Offline';
        statusDot.classList.add('offline');
        statusAvatar.classList.add('offline');
    }

    function updateAdminStatus() {
        localStorage.setItem('ediza10_admin', 'true');
        localStorage.setItem('ediza10_last_active', Date.now().toString());
        setOnlineStatus();
    }

    updateAdminStatus();
    checkOnlineStatus();

    setInterval(() => {
        updateAdminStatus();
    }, 30000);

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            localStorage.setItem('ediza10_last_active', Date.now().toString());
        } else {
            updateAdminStatus();
        }
    });

    window.addEventListener('beforeunload', function() {
        localStorage.setItem('ediza10_last_active', Date.now().toString());
    });

    document.addEventListener('mousemove', function(e) {
        if (cursorGlow && window.innerWidth > 768) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }
    });

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + '%';
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateStats();
                    statsAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    const sections = document.querySelectorAll('.content-section, .services-section, .stats-section, .contact-section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});
