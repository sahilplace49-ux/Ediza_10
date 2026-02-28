document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const particles = document.querySelector('.particle-container');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s infinite;
        `;
        particles.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    const starInputs = document.querySelectorAll('.star-input');
    const ratingInput = document.getElementById('rating');

    starInputs.forEach((star, index) => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingInput.value = rating;

            starInputs.forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    starInputs.forEach(star => star.classList.add('active'));
    ratingInput.value = '5';

    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('clientName').value;
        const rating = parseInt(document.getElementById('rating').value);
        const text = document.getElementById('reviewText').value;

        const review = {
            name: name,
            rating: rating,
            text: text,
            date: new Date().toISOString()
        };

        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        reviewForm.reset();
        starInputs.forEach(star => star.classList.add('active'));
        ratingInput.value = '5';

        displayReviews();
        updateOverallRating();

        const successMessage = document.createElement('div');
        successMessage.textContent = 'Thank you! Your review has been submitted.';
        successMessage.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #00d4ff, #7b2ff7);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 1.1rem;
            z-index: 10000;
            animation: slideDown 0.5s ease;
        `;
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.style.animation = 'slideUp 0.5s ease';
            setTimeout(() => successMessage.remove(), 500);
        }, 3000);
    });

    function displayReviews() {
        const reviewsList = document.getElementById('reviewsList');
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        reviewsList.innerHTML = '';

        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';

            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

            reviewCard.innerHTML = `
                <div class="review-header">
                    <div class="review-author">${escapeHtml(review.name)}</div>
                    <div class="review-stars">${stars}</div>
                </div>
                <div class="review-text">${escapeHtml(review.text)}</div>
            `;

            reviewsList.appendChild(reviewCard);
        });
    }

    function updateOverallRating() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const overallRatingElement = document.getElementById('overallRating');
        const overallStarsElement = document.getElementById('overallStars');
        const reviewCountElement = document.getElementById('reviewCount');

        if (reviews.length === 0) {
            overallRatingElement.textContent = '5.0';
            overallStarsElement.innerHTML = '★★★★★';
            reviewCountElement.textContent = '0 Reviews';
            return;
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        const roundedRating = Math.round(avgRating * 10) / 10;

        overallRatingElement.textContent = roundedRating.toFixed(1);

        const fullStars = Math.floor(avgRating);
        const hasHalfStar = avgRating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let starsHTML = '★'.repeat(fullStars);
        if (hasHalfStar) starsHTML += '★';
        starsHTML += '☆'.repeat(emptyStars);

        overallStarsElement.innerHTML = starsHTML;
        reviewCountElement.textContent = `${reviews.length} Review${reviews.length !== 1 ? 's' : ''}`;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    displayReviews();
    updateOverallRating();

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.portfolio-item, .review-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
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

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

const styleAnimation = document.createElement('style');
styleAnimation.textContent = `
    @keyframes slideDown {
        from {
            top: -100px;
            opacity: 0;
        }
        to {
            top: 100px;
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            top: 100px;
            opacity: 1;
        }
        to {
            top: -100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleAnimation);
