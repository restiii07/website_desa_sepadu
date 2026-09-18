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


/* =====================================================
   SISTEM ADUAN + TOKEN + ADMIN
===================================================== */
const ADUAN_SCRIPT_URL = "GANTI_DENGAN_URL_WEB_APP_GOOGLE_APPS_SCRIPT";

function buatToken() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let token = "DSP-";
    for (let i = 0; i < 8; i++) token += chars[Math.floor(Math.random() * chars.length)];
    return token;
}

function setMessage(el, text, ok = true) {
    if (!el) return;
    el.innerHTML = text;
    el.style.color = ok ? "#315b45" : "#b33a3a";
}

const aduanForm = document.getElementById("aduanForm");
if (aduanForm) {
    aduanForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const btn = aduanForm.querySelector("button[type=submit]");
        const msg = document.getElementById("aduanMessage");
        const token = buatToken();
        btn.disabled = true; btn.textContent = "Mengirim...";
        const data = new URLSearchParams(new FormData(aduanForm));
        data.append("action", "submit"); data.append("token", token);
        try {
            await fetch(ADUAN_SCRIPT_URL, { method: "POST", mode: "no-cors", body: data });
            setMessage(msg, `<strong>Aduan berhasil dikirim!</strong><br>Token Anda: <strong>${token}</strong><br><small>Simpan token ini untuk mengecek jawaban aduan.</small>`);
            aduanForm.reset();
        } catch (err) {
            setMessage(msg, "Aduan gagal dikirim. Periksa URL Google Apps Script.", false);
        } finally { btn.disabled = false; btn.textContent = "Kirim Aduan →"; }
    });
}

const cekForm = document.getElementById("cekAduanForm");
if (cekForm) {
    cekForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const token = document.getElementById("tokenCek").value.trim().toUpperCase();
        const result = document.getElementById("statusResult");
        result.innerHTML = "Memeriksa...";
        try {
            const res = await fetch(`${ADUAN_SCRIPT_URL}?action=check&token=${encodeURIComponent(token)}`);
            const d = await res.json();
            if (!d.found) { result.innerHTML = `<div class="status-box belum">Token tidak ditemukan. Pastikan token benar.</div>`; return; }
            const sudah = String(d.status).toLowerCase() === "sudah dijawab";
            result.innerHTML = `<div class="status-box ${sudah ? "sudah" : "belum"}"><strong>${sudah ? "✓ Sudah dijawab" : "⏳ Belum dijawab"}</strong><p><b>Judul:</b> ${escapeHtml(d.judul || "-")}</p>${sudah ? `<p><b>Jawaban admin:</b><br>${escapeHtml(d.jawaban || "-")}</p>` : `<p>Aduan Anda masih menunggu jawaban dari admin Desa Sepadu.</p>`}</div>`;
        } catch (err) { result.innerHTML = `<div class="status-box belum">Tidak dapat memeriksa status. Pastikan URL Web App sudah diisi.</div>`; }
    });
}

function escapeHtml(str) { return String(str).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c])); }

/* Admin page */
const adminLogin = document.getElementById("adminLogin");
if (adminLogin) {
    adminLogin.addEventListener("submit", e => {
        e.preventDefault();
        const pass = document.getElementById("adminPassword").value;
        const loginMessage = document.getElementById("loginMessage");
        loginMessage.textContent = "Memeriksa password...";
        try {
            const res = await fetch(`${ADUAN_SCRIPT_URL}?action=list&password=${encodeURIComponent(pass)}`);
            const rows = await res.json();
            if (!Array.isArray(rows)) throw new Error("unauthorized");
            sessionStorage.setItem("sepaduAdmin", "1");
            sessionStorage.setItem("sepaduAdminPassword", pass);
            document.getElementById("loginPanel").style.display = "none";
            document.getElementById("adminPanel").style.display = "block";
            renderAduanAdmin(rows);
        } catch (err) {
            loginMessage.textContent = "Password salah atau koneksi server belum disiapkan.";
        }
    });
}

async function loadAduanAdmin() {
    const box = document.getElementById("adminList"); if (!box) return;
    box.innerHTML = "Memuat data aduan...";
    try {
        const pass = sessionStorage.getItem("sepaduAdminPassword");
        if (!pass) { box.innerHTML = "Silakan login terlebih dahulu."; return; }
        const res = await fetch(`${ADUAN_SCRIPT_URL}?action=list&password=${encodeURIComponent(pass)}`);
        const rows = await res.json();
        if (!Array.isArray(rows)) throw new Error("unauthorized");
        renderAduanAdmin(rows);
    } catch(e) { box.innerHTML = "Gagal mengambil data. Periksa URL Web App."; }
}

function renderAduanAdmin(rows) {
    const box = document.getElementById("adminList");
    if (!rows.length) { box.innerHTML = "Belum ada aduan."; return; }
    box.innerHTML = rows.map((r,i) => `<article class="admin-aduan"><div class="admin-head"><span>${escapeHtml(r.token)}</span><b>${escapeHtml(r.status)}</b></div><h3>${escapeHtml(r.judul)}</h3><p><b>Nama:</b> ${escapeHtml(r.nama)} &nbsp; <b>Kategori:</b> ${escapeHtml(r.kategori)}</p><p>${escapeHtml(r.isi_aduan)}</p><textarea id="jawaban-${i}" placeholder="Tulis jawaban untuk masyarakat...">${escapeHtml(r.jawaban || "")}</textarea><button class="btn btn-primary" onclick="jawabAduan('${encodeURIComponent(r.token)}', ${i})">Simpan Jawaban</button></article>`).join("");
}

async function jawabAduan(encodedToken, i) {
    const token = decodeURIComponent(encodedToken); const jawaban = document.getElementById(`jawaban-${i}`).value.trim();
    const password = sessionStorage.getItem("sepaduAdminPassword");
    if (!jawaban) return alert("Jawaban belum diisi.");
    if (!password) return alert("Sesi admin sudah berakhir. Silakan login kembali.");
    const data = new URLSearchParams({action:"answer", token, jawaban, password});
    await fetch(ADUAN_SCRIPT_URL, {method:"POST", mode:"no-cors", body:data});
    alert("Jawaban dikirim. Silakan muat ulang daftar aduan untuk melihat perubahan.");
    loadAduanAdmin();
}

if (document.getElementById("adminPanel") && sessionStorage.getItem("sepaduAdmin") === "1" && sessionStorage.getItem("sepaduAdminPassword")) {
    document.getElementById("loginPanel").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadAduanAdmin();
}
