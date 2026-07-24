// =========================
// Mobile Menu
// =========================

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}

// =========================
// Scroll Progress
// =========================

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});

// =========================
// Cursor Glow
// =========================

const cursorGlow =
    document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    cursorGlow.style.left =
        e.clientX + "px";

    cursorGlow.style.top =
        e.clientY + "px";

});

// =========================
// Particle System
// =========================

const particles =
    document.getElementById("particles");

if (particles) {

    for (let i = 0; i < 80; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        const size =
            Math.random() * 6 + 2;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            Math.random() * 8 + 5 + "s";

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particle.style.opacity =
            Math.random();

        particles.appendChild(particle);
    }
}

// =========================
// Reveal Animation
// =========================

const revealElements =
    document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach(element => {

        const top =
            element.getBoundingClientRect().top;

        const visible =
            window.innerHeight - 100;

        if (top < visible) {

            element.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

// =========================
// Animated Counters
// =========================

const counters =
    document.querySelectorAll(".counter");

let counterStarted = false;

function runCounters() {

    if (counterStarted) return;

    const statsSection =
        document.querySelector(".stats");

    if (!statsSection) return;

    const top =
        statsSection.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const target =
                Number(counter.dataset.target);

            let current = 0;

            const increment =
                target / 120;

            function updateCounter() {

                current += increment;

                if (current < target) {

                    counter.textContent =
                        Math.floor(current);

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target;

                }

            }

            updateCounter();

        });

    }

}

window.addEventListener(
    "scroll",
    runCounters
);

runCounters();

// =========================
// Testimonial Slider
// =========================

const testimonials =
    document.querySelectorAll(".testimonial");

let testimonialIndex = 0;

if (testimonials.length > 0) {

    setInterval(() => {

        testimonials[
            testimonialIndex
        ].classList.remove("active");

        testimonialIndex++;

        if (
            testimonialIndex >=
            testimonials.length
        ) {

            testimonialIndex = 0;

        }

        testimonials[
            testimonialIndex
        ].classList.add("active");

    }, 5000);

}

// =========================
// Hero Parallax
// =========================

const hero =
    document.querySelector(".hero");

window.addEventListener("scroll", () => {

    const offset =
        window.pageYOffset;

    if (hero) {

        hero.style.backgroundPositionY =
            offset * 0.4 + "px";

    }

});

// =========================
// Service Card Hover Tilt
// =========================

const cards =
    document.querySelectorAll(
        ".service-card, .stat-card"
    );

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 15;

            const rotateX =
                ((y / rect.height) - 0.5) * -15;

            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
                `;

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        }
    );

});

// =========================
// Smooth Fade In
// =========================

window.addEventListener(
    "load",
    () => {

        document.body.style.opacity = "1";

    }
);

// =========================
// Floating Animation
// =========================

const floatingCards =
    document.querySelectorAll(
        ".service-card"
    );

floatingCards.forEach(
    (card, index) => {

        card.animate(
            [
                {
                    transform:
                        "translateY(0px)"
                },
                {
                    transform:
                        "translateY(-12px)"
                },
                {
                    transform:
                        "translateY(0px)"
                }
            ],
            {
                duration:
                    3000 + (index * 500),
                iterations:
                    Infinity
            }
        );

    }
);

// =========================
// CTA Button Pulse
// =========================

const buttons =
    document.querySelectorAll(
        ".btn-primary"
    );

buttons.forEach(button => {

    setInterval(() => {

        button.animate(
            [
                {
                    transform:
                        "scale(1)"
                },
                {
                    transform:
                        "scale(1.05)"
                },
                {
                    transform:
                        "scale(1)"
                }
            ],
            {
                duration: 1200
            }
        );

    }, 5000);

});

// =========================
// Console Signature
// =========================

console.log(
`
=================================
LUXE BUSINESS WEBSITE
Luxury Interactive Experience
=================================
`
);