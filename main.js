document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Magnetic Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const interactiveElements = document.querySelectorAll('a, button, .project-card');

    // Only apply if not on touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Immediate update for the dot
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Smooth follower animation using RequestAnimationFrame
        const render = () => {
            // Easing formula for smooth trailing effect
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);

        // Hover states
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('hover-state');
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('hover-state');
            });
        });
    }

    // 2. Render Project Cards Dynamically
    const projectContainer = document.getElementById('project-container');

    if (projectContainer && typeof projectData !== 'undefined') {
        projectContainer.innerHTML = ''; // clear initial state

        projectData.forEach((project) => {
            // Build the tech stack tags
            const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            // Construct the html string for the card
            const cardHTML = `
                <article class="project-card glass-card fade-in-up ${project.delayClass || ''}">
                    <div class="card-image-wrapper">
                        <img src="${project.image}" alt="${project.title}" class="project-img">
                        <div class="card-overlay">
                            <a href="${project.demoLink}" class="overlay-btn primary" target="_blank">Live Demo</a>
                            <a href="${project.sourceLink}" class="overlay-btn secondary" target="_blank">Source</a>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="tech-stack">
                            ${tagsHTML}
                        </div>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                </article>
            `;

            // Insert into the grid
            projectContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // 3. 3D Tilt Effect on Project Cards (Wait until after render)
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

            // Add subtle lighting effect logic based on mouse position
            // We use background gradient to simulate shine
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
        });
    });

    // 3. Scroll Entry Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Trigger hero animations immediately on load
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
});
