/* =====================================================
   DESA SEPADU
   JAVASCRIPT INTERACTIVE
===================================================== */


/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
    } else {
        navbar?.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("show");

        if (navMenu.classList.contains("show")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });


    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

            menuToggle.textContent = "☰";

        });

    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= 3D CARD TILT ================= */

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -4;

        const rotateY =
            ((x - centerX) / centerX) * 4;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

    });

});


/* ================= HERO PARALLAX ================= */

const parallaxElements =
    document.querySelectorAll(".parallax");

window.addEventListener("mousemove", event => {

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);

    parallaxElements.forEach(element => {

        element.style.transform =
            `translate(${x * 20}px, ${y * 15}px)`;

    });

});


/* ================= BUTTON RIPPLE ================= */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(event) {

        const ripple =
            document.createElement("span");

        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,.5)";
        ripple.style.width = "10px";
        ripple.style.height = "10px";
        ripple.style.transform = "scale(0)";
        ripple.style.pointerEvents = "none";

        const rect =
            button.getBoundingClientRect();

        ripple.style.left =
            `${event.clientX - rect.left - 5}px`;

        ripple.style.top =
            `${event.clientY - rect.top - 5}px`;

        button.appendChild(ripple);

        ripple.animate(
            [
                {
                    transform: "scale(0)",
                    opacity: 1
                },
                {
                    transform: "scale(25)",
                    opacity: 0
                }
            ],
            {
                duration: 600,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            ripple.remove();
        }, 650);

    });

});


/* ================= BACK TO TOP ================= */

const backTop =
    document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (!backTop) return;

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


if (backTop) {

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ================= FORM ================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const nama =
            document.getElementById("nama").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subjek =
            document.getElementById("subjek").value.trim();

        const pesan =
            document.getElementById("pesan").value.trim();


        if (
            !nama ||
            !email ||
            !subjek ||
            !pesan
        ) {

            alert(
                "Mohon lengkapi semua data terlebih dahulu."
            );

            return;

        }


        alert(
            "Pesan berhasil disiapkan! Terima kasih telah menghubungi Desa Sepadu."
        );


        contactForm.reset();

    });

}


/* ================= SCROLL PROGRESS ================= */

const progress =
    document.createElement("div");

progress.style.position = "fixed";
progress.style.top = "0";
progress.style.left = "0";
progress.style.height = "4px";
progress.style.width = "0%";
progress.style.background =
    "linear-gradient(90deg,#7651c9,#a98bea)";
progress.style.zIndex = "9999";
progress.style.transition = "width .1s";

document.body.appendChild(progress);


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progress.style.width =
        percentage + "%";

});


/* ================= ACTIVE PAGE ================= */

const currentPage =
    document.body.dataset.page;

document.querySelectorAll(".nav-menu a")
    .forEach(link => {

        const href =
            link.getAttribute("href");

        if (
            currentPage === "home" &&
            href === "index.html"
        ) {
            link.classList.add("active");
        }

    });


/* ================= SMALL FLOATING EFFECT ================= */

const floatingObjects =
    document.querySelectorAll(
        ".floating-leaf, .flower, .cloud"
    );

floatingObjects.forEach((object, index) => {

    object.style.animationDelay =
        `${index * 0.5}s`;

});


console.log(
    "🌿 Website Desa Sepadu berhasil dimuat."
);
