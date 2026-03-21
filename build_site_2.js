const fs = require('fs');
const path = require('path');

const dir = 'c:/dr.zahir';

// 1. Rename files perfectly
const filesToRename = {
    'dr zahir photo.jpg': 'dr-zahir-photo.jpg',
    'dr zahirphoto 2.jpg': 'dr-zahirphoto-2.jpg',
    'zahir pphoto.jpg': 'zahir-pphoto.jpg',
    'celebrity dr zahir.jpg': 'celebrity-dr-zahir.jpg',
    'testimonial zahir.jpg': 'testimonial-zahir.jpg',
    'dr zahir testimonial.jpg': 'dr-zahir-testimonial.jpg',
    'dr.zahir full logo.png': 'dr-zahir-full-logo.png'
};

for (const [oldName, newName] of Object.entries(filesToRename)) {
    const oldPath = path.join(dir, oldName);
    const newPath = path.join(dir, newName);
    if (fs.existsSync(oldPath)) {
        try { fs.renameSync(oldPath, newPath); console.log(`Renamed ${oldName}`); } catch(e) {}
    }
}

// 2. Define Layout Components
const headHtml = (title) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Centre Dentaire Zahir</title>
    <meta name="description" content="Centre Dentaire Zahir à Casablanca – Soins dentaires d'excellence pour toute la famille.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Jost:wght@300..700&display=swap" rel="stylesheet">
    <style>
        :root {
            --navy: #0a1628;
            --navy-light: #111d35;
            --gold: #c8a456;
            --gold-light: #e0c882;
            --gold-glow: rgba(200, 164, 86, 0.4);
            --white: #ffffff;
            --gray: #8892a4;
            --gray-light: #b0b8c8;
            --glass-bg: rgba(255, 255, 255, 0.03);
            --glass-border: rgba(255, 255, 255, 0.08);
            --heading: 'Playfair Display', serif;
            --body: 'Jost', sans-serif;
            --overlay: rgba(10, 22, 40, 0.85);
            --transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: var(--body); color: var(--white); background: var(--navy); line-height: 1.6; overflow-x: hidden; padding-top: 80px; }
        h1, h2, h3, h4 { font-family: var(--heading); font-weight: 600; line-height: 1.2; }
        a { text-decoration: none; color: inherit; }
        img { max-width: 100%; height: auto; display: block; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* Navbar */
        .navbar { position: fixed; top: 0; width: 100%; z-index: 100; padding: 20px 0; transition: var(--transition); background: var(--navy); border-bottom: 1px solid var(--glass-border); }
        .navbar.scrolled { background: rgba(10, 22, 40, 0.95); backdrop-filter: blur(10px); padding: 12px 0; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .nav-brand img { height: 45px; width: auto; object-fit: contain; }
        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-links a { color: var(--white); font-weight: 500; font-size: 0.95rem; transition: color 0.3s; }
        .nav-links a:hover, .nav-links a.active { color: var(--gold); }
        .nav-phone { display: flex; align-items: center; gap: 6px; font-weight: 600; color: var(--white); }
        .nav-cta { background: var(--gold); color: var(--navy) !important; padding: 10px 24px; border-radius: 30px; font-weight: 600; transition: var(--transition); cursor: pointer; border: none; font-size: 0.95rem; }
        .nav-cta:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 6px 15px var(--gold-glow); }
        .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; }
        .hamburger span { width: 25px; height: 2px; background: var(--white); transition: 0.3s; }
        
        @media (max-width: 992px) {
            .nav-links { position: absolute; top: -400px; left: 0; width: 100%; background: var(--navy-light); flex-direction: column; padding: 20px 0; box-shadow: 0 10px 20px rgba(0,0,0,0.5); transition: top 0.4s ease-in-out; }
            .nav-links.active { top: 100%; }
            .hamburger { display: flex; }
            .nav-phone { display: none; }
        }
        
        /* Shared Styles */
        .section { padding: 100px 0; }
        .section-title { text-align: center; margin-bottom: 60px; }
        .section-title h2 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 16px; }
        .section-title p { color: var(--gray); font-size: 1.1rem; max-width: 600px; margin: 0 auto; }
        .gold-line { width: 60px; height: 3px; background: var(--gold); margin: 20px auto 0; border-radius: 2px; }
        .animate-on-scroll { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
        .animate-on-scroll.visible { opacity: 1; transform: translateY(0); }
        
        /* Hero Banners */
        .page-hero { background: var(--navy-light); padding: 80px 0 60px; text-align: center; border-bottom: 1px solid var(--glass-border); }
        .page-hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); color: var(--gold); margin-bottom: 15px; }
        .page-hero p { font-size: 1.2rem; color: var(--gray-light); max-width: 800px; margin: 0 auto; }
        .breadcrumb { font-size: 0.95rem; color: var(--gray); margin-top: 20px; }
        .breadcrumb a { color: var(--white); transition: 0.3s; }
        .breadcrumb a:hover { color: var(--gold); }
        
        /* Footer */
        .footer { background: var(--navy-light); padding: 80px 0 30px; border-top: 1px solid var(--glass-border); }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1.5fr; gap: 40px; margin-bottom: 50px; }
        .footer-brand img { height: 55px; width: auto; margin-bottom: 20px; }
        .footer h4 { color: var(--white); margin-bottom: 20px; font-size: 1.1rem; }
        .footer-links { display: flex; flex-direction: column; gap: 12px; }
        .footer-links a { color: var(--gray); transition: 0.3s; }
        .footer-links a:hover { color: var(--gold); padding-left: 5px; }
        .footer-bottom { border-top: 1px solid var(--glass-border); padding-top: 25px; text-align: center; color: var(--gray); font-size: 0.9rem; }
        
        /* Floating */
        .float-btn { position: fixed; bottom: 30px; z-index: 90; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 20px rgba(0,0,0,0.3); transition: 0.3s; }
        .float-btn.hidden { opacity: 0; visibility: hidden; transform: translateY(20px); }
        .float-wa { right: 30px; background: #25d366; color: white; font-size: 1.8rem; animation: pulse-wa 2s infinite; }
        .float-phone { left: 30px; background: var(--gold); color: var(--navy); font-size: 1.8rem; animation: pulse-phone 2s infinite; }
        @keyframes pulse-wa { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); } 70% { box-shadow: 0 0 0 15px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }
        @keyframes pulse-phone { 0% { box-shadow: 0 0 0 0 rgba(200,164,86,0.6); } 70% { box-shadow: 0 0 0 15px rgba(200,164,86,0); } 100% { box-shadow: 0 0 0 0 rgba(200,164,86,0); } }
        
        /* Modal */
        .modal { position: fixed; inset: 0; background: var(--overlay); z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: 0.4s; padding: 20px; backdrop-filter: blur(5px); }
        .modal.active { opacity: 1; pointer-events: auto; }
        .booking-box { width: 100%; max-width: 520px; border-radius: 20px; background: var(--navy); border-top: 4px solid var(--gold); padding: 25px; position: relative; text-align: center; }
        .modal-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .modal-close { position: absolute; top: 15px; right: 20px; font-size: 2rem; color: #fff; background: none; border: none; cursor: pointer; z-index: 10; }
        .step { display: none; }
        .step.active { display: block; animation: slideIn 0.3s forwards; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .service-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .service-btn { background: var(--navy-light); border: 1px solid var(--glass-border); padding: 15px; border-radius: 12px; color: var(--white); cursor: pointer; }
        .service-btn:hover, .service-btn.selected { border-color: var(--gold); }
        .time-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .time-btn { background: var(--navy-light); border: 1px solid var(--glass-border); padding: 12px; border-radius: 10px; color: var(--white); cursor: pointer; }
        .time-btn.selected { background: var(--gold); color: var(--navy); }
        .form-group { margin-bottom: 15px; text-align: left; }
        .form-group label { display: block; margin-bottom: 6px; color: var(--gray-light); }
        .form-group input, .form-group textarea { width: 100%; background: var(--navy-light); border: 1px solid var(--glass-border); padding: 12px; border-radius: 8px; color: var(--white); }
        .btn-submit { background: var(--gold); color: var(--navy); width: 100%; padding: 15px; border-radius: 8px; font-weight: bold; border: none; cursor: pointer; }
        
        /* Checkmark */
        .checkmark { width: 80px; height: 80px; border-radius: 50%; display: block; stroke-width: 2; stroke: #fff; stroke-miterlimit: 10; margin: 10% auto; box-shadow: inset 0px 0px 0px #4CAF50; animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both; }
        .checkmark__circle { stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 2; stroke-miterlimit: 10; stroke: #4CAF50; fill: none; animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
        .checkmark__check { transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; }
        @keyframes stroke { 100% { stroke-dashoffset: 0; } }
        @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 50px #4CAF50; } }
        @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
        
        /* Standard Buttons */
        .btn-large { padding: 18px 40px; border-radius: 40px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: var(--transition); border: none; display: inline-flex; align-items: center; gap: 10px; }
        .btn-primary { background: var(--gold); color: var(--navy); }
        .btn-primary:hover { background: var(--gold-light); transform: translateY(-3px); }
        .btn-dark { background: var(--navy-light); color: var(--gold); border: 1px solid var(--gold); padding: 15px 30px; border-radius: 30px; transition: 0.3s; }
        .btn-dark:hover { background: var(--gold); color: var(--navy); }
    </style>
</head>
`;

const navbarHtml = (active) => `
    <nav class="navbar" id="navbar">
        <div class="container nav-container">
            <a href="index.html" class="nav-brand" aria-label="Accueil">
                <img src="dr-zahir-full-logo.png" height="45" style="width:auto;" alt="Centre Dentaire Zahir">
            </a>
            <div class="nav-links" id="navLinks">
                <a href="index.html" class="${active === 'index' ? 'active' : ''}">Accueil</a>
                <a href="services.html" class="${active === 'services' ? 'active' : ''}">Services</a>
                <a href="cabinet.html" class="${active === 'cabinet' ? 'active' : ''}">Le Cabinet</a>
                <a href="avis.html" class="${active === 'avis' ? 'active' : ''}">Avis</a>
                <a href="contact.html" class="${active === 'contact' ? 'active' : ''}">Contact</a>
            </div>
            <div class="nav-phone">
                <span>📞 <a href="tel:+212772153477">0772 15 34 77</a></span>
                <button class="nav-cta open-modal" aria-label="Prendre rendez-vous">Rendez-vous</button>
            </div>
            <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
    </nav>
`;

const footerHtml = `
    <footer class="footer" id="footer-trigger">
        <div class="container footer-grid">
            <div class="footer-brand">
                <a href="index.html" aria-label="Accueil">
                    <img src="dr-zahir-full-logo.png" height="55" style="width:auto; margin-bottom: 15px;" alt="Centre Dentaire Zahir">
                </a>
                <p style="color: var(--gray-light);">Votre cabinet dentaire de référence à Casablanca. Nous redonnons vie à votre sourire avec une expertise irréprochable.</p>
            </div>
            <div>
                <h4>Liens Rapides</h4>
                <div class="footer-links">
                    <a href="services.html">Nos Services</a>
                    <a href="cabinet.html">Le Cabinet</a>
                    <a href="avis.html">Avis Patients</a>
                    <a href="contact.html">Contact</a>
                </div>
            </div>
            <div>
                <h4>Contact</h4>
                <div class="footer-links">
                    <a href="tel:+212772153477">📞 0772 15 34 77</a>
                    <a href="https://wa.me/212772153477" target="_blank">💬 WhatsApp</a>
                    <a href="https://maps.google.com/maps?q=33.5731,-7.5898" target="_blank">📍 Voir sur Google Maps</a>
                </div>
            </div>
        </div>
        <div class="container footer-bottom">
            © 2026 Centre Dentaire Zahir — Tous droits réservés | Développé par <a href="https://mixagenci.com" style="color:var(--gold);">Mix Agenci</a>
        </div>
    </footer>
    
    <a href="tel:+212772153477" class="float-btn float-phone" aria-label="Appeler">📞</a>
    <a href="https://wa.me/212772153477" class="float-btn float-wa" target="_blank" aria-label="WhatsApp" style="text-decoration:none; display:flex; align-items:center; justify-content:center;">💬</a>
`;

const modalHtml = `
    <div class="modal" id="bookingModal">
        <div class="booking-box">
            <button class="modal-close" id="closeModal">×</button>
            <div class="modal-header">
                <button id="bookBack" style="background:none;border:none;color:var(--gold);font-size:1.5rem;display:none;cursor:pointer;">&larr;</button>
                <div id="stepDots" style="display:flex; gap:8px; margin:0 auto;">
                    <span class="dot active" style="width:8px;height:8px;background:var(--gold);border-radius:50%;"></span>
                    <span class="dot" style="width:8px;height:8px;background:var(--glass-border);border-radius:50%;"></span>
                    <span class="dot" style="width:8px;height:8px;background:var(--glass-border);border-radius:50%;"></span>
                    <span class="dot" style="width:8px;height:8px;background:var(--glass-border);border-radius:50%;"></span>
                </div>
                <div style="width:24px; visibility:hidden;"></div>
            </div>
            
            <div class="step step-1 active">
                <h3 style="color:var(--white);">1. Choisissez un service</h3>
                <div class="service-grid">
                    <button class="service-btn" data-service="Implants">🦷<br>Implants</button>
                    <button class="service-btn" data-service="Blanchiment">✨<br>Blanchiment</button>
                    <button class="service-btn" data-service="Facettes">💎<br>Facettes</button>
                    <button class="service-btn" data-service="Orthodontie">😁<br>Orthodontie</button>
                    <button class="service-btn" data-service="Détartrage">🪥<br>Détartrage</button>
                    <button class="service-btn" data-service="Couronnes">👑<br>Couronnes</button>
                    <button class="service-btn" data-service="Caries">🩺<br>Soins de caries</button>
                    <button class="service-btn" data-service="Extraction">💉<br>Extraction</button>
                </div>
            </div>
            
            <div class="step step-2">
                <h3 style="color:var(--white);">2. Choisissez une date</h3>
                <div style="background:var(--navy-light); padding:15px; border-radius:12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:15px; color:var(--gold); font-weight:600;">
                        <button id="prevMonth" style="background:none;border:none;color:var(--gold);cursor:pointer;font-size:1.2rem;">&larr;</button>
                        <span id="monthYearDisplay"></span>
                        <button id="nextMonth" style="background:none;border:none;color:var(--gold);cursor:pointer;font-size:1.2rem;">&rarr;</button>
                    </div>
                    <div style="display:grid; grid-template-columns:repeat(7, 1fr); color:var(--gray); font-size:0.85rem; margin-bottom:10px;">
                        <span>Lu</span><span>Ma</span><span>Me</span><span>Je</span><span>Ve</span><span>Sa</span><span>Di</span>
                    </div>
                    <div id="calGrid" style="display:grid; grid-template-columns:repeat(7, 1fr); gap:5px;"></div>
                </div>
            </div>
            
            <div class="step step-3">
                <h3 style="color:var(--white);">3. Choisissez l'heure</h3>
                <div class="time-grid">
                    <button class="time-btn" data-time="09h00">09h00</button>
                    <button class="time-btn" data-time="10h00">10h00</button>
                    <button class="time-btn" data-time="11h00">11h00</button>
                    <button class="time-btn" data-time="14h00">14h00</button>
                    <button class="time-btn" data-time="15h00">15h00</button>
                    <button class="time-btn" data-time="16h00">16h00</button>
                    <button class="time-btn" data-time="17h00">17h00</button>
                    <button class="time-btn" data-time="18h00">18h00</button>
                </div>
            </div>
            
            <div class="step step-4">
                <h3 style="color:var(--white);">4. Vos informations</h3>
                <div class="form-group">
                    <label>Nom complet *</label>
                    <input type="text" id="patientName" placeholder="Votre nom" required>
                </div>
                <div class="form-group">
                    <label>Téléphone *</label>
                    <input type="tel" id="patientPhone" placeholder="06XXXXXXXX" required>
                </div>
                <div class="form-group">
                    <label>Message (optionnel)</label>
                    <textarea id="patientMessage" rows="2" placeholder="Notes additionnelles"></textarea>
                </div>
                <button class="btn-submit" id="submitBooking">Confirmer le rendez-vous</button>
            </div>
            
            <div class="step step-5">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <h3 style="color:var(--white); margin:20px 0;">Demande envoyée !</h3>
                <p style="color:var(--gray-light); margin-bottom:20px;">Nous vous contacterons dans l'heure.</p>
                <div style="display:flex; gap:10px;">
                    <button id="closeFinalBtn" style="flex:1; padding:12px; border-radius:8px; border:1px solid var(--glass-border); background:none; color:var(--white); cursor:pointer;">Fermer</button>
                    <a href="tel:+212772153477" style="flex:1; padding:12px; border-radius:8px; background:#4CAF50; color:white; font-weight:bold; cursor:pointer;">📞 Appeler</a>
                </div>
            </div>
        </div>
    </div>
`;

const globalScripts = `
    <script>
        // Hamburger Menu
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
        navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));

        // IntersectionObserver for scroll items and navbar background
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    if (e.target.classList.contains('social-proof') && !e.target.counted) {
                        e.target.counted = true;
                        e.target.querySelectorAll('.counter').forEach(counter => {
                            const target = +counter.getAttribute('data-target');
                            const increment = target / 50;
                            const isDec = counter.hasAttribute('data-decimals');
                            const isPlus = counter.hasAttribute('data-plus');
                            let current = 0;
                            const t = setInterval(() => {
                                current += increment;
                                if(current >= target) { counter.innerText = (isDec?target.toFixed(1):target) + (isPlus?'+':''); clearInterval(t); }
                                else { counter.innerText = (isDec?current.toFixed(1):Math.ceil(current)) + (isPlus?'+':''); }
                            }, 30);
                        });
                    }
                }
            });
        });
        document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

        const navObserver = new IntersectionObserver((entries) => {
            const navbar = document.getElementById('navbar');
            if (entries[0].isIntersecting) navbar.classList.remove('scrolled');
            else navbar.classList.add('scrolled');
        });
        const dummy = document.createElement('div');
        dummy.style.position = 'absolute'; dummy.style.top = '0'; dummy.style.height = '10px'; dummy.style.width = '100%'; dummy.style.pointerEvents = 'none';
        document.body.prepend(dummy);
        navObserver.observe(dummy);

        // Hide floating buttons
        const floatObserver = new IntersectionObserver(entries => {
            const btns = document.querySelectorAll('.float-btn');
            if(entries[0].isIntersecting) btns.forEach(b => b.classList.add('hidden'));
            else btns.forEach(b => b.classList.remove('hidden'));
        }, { rootMargin: '100px' });
        const ft = document.getElementById('footer-trigger');
        if(ft) floatObserver.observe(ft);

        // Booking Modal Logic
        const bookingState = { s: '', d: '', t: '', n: '', p: '' };
        let cStep = 1;
        const bModal = document.getElementById('bookingModal');
        const bPts = document.querySelectorAll('.step');
        const bDots = document.querySelectorAll('.dot');
        const setStep = (n) => {
            bPts.forEach((s, i) => s.classList.remove('active'));
            bPts[n-1].classList.add('active');
            if (n<=4) {
                bDots.forEach((d, i) => d.style.background = i<n ? 'var(--gold)' : 'var(--glass-border)');
                document.getElementById('stepDots').style.display = 'flex';
                document.getElementById('bookBack').style.display = n>1 ? 'block' : 'none';
            } else {
                document.getElementById('stepDots').style.display = 'none';
                document.getElementById('bookBack').style.display = 'none';
                document.getElementById('closeModal').style.display = 'none';
            }
        };

        const closeMod = () => { if(bModal) bModal.classList.remove('active'); document.body.style.overflow = ''; };
        document.querySelectorAll('.open-modal').forEach(btn => btn.addEventListener('click', e => {
            e.preventDefault();
            bModal.classList.add('active'); document.body.style.overflow = 'hidden';
            cStep = 1; setStep(cStep); renderCal();
        }));
        document.getElementById('closeModal').addEventListener('click', closeMod);
        document.getElementById('closeFinalBtn').addEventListener('click', closeMod);
        bModal.addEventListener('click', e => { if (e.target === bModal && cStep < 5) closeMod(); });
        document.getElementById('bookBack').addEventListener('click', () => { if(cStep>1) setStep(--cStep); });

        document.querySelectorAll('.service-btn').forEach(b => b.addEventListener('click', () => {
            document.querySelectorAll('.service-btn').forEach(x => x.classList.remove('selected'));
            b.classList.add('selected'); bookingState.s = b.getAttribute('data-service');
            requestAnimationFrame(() => setStep(++cStep));
        }));

        let cMonth = new Date().getMonth(), cYear = new Date().getFullYear();
        const renderCal = () => {
            const grid = document.getElementById('calGrid');
            grid.innerHTML = '';
            const first = new Date(cYear, cMonth, 1).getDay();
            const skip = first === 0 ? 6 : first - 1;
            const days = new Date(cYear, cMonth+1, 0).getDate();
            const names = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
            document.getElementById('monthYearDisplay').innerText = names[cMonth] + ' ' + cYear;
            for(let i=0; i<skip; i++) grid.innerHTML += '<div style="height:40px;"></div>';
            
            const today = new Date(); today.setHours(0,0,0,0);
            for(let d=1; d<=days; d++) {
                const date = new Date(cYear, cMonth, d);
                const el = document.createElement('div');
                el.innerText = d;
                el.style.cssText = 'height:40px; display:flex; align-items:center; justify-content:center; border-radius:8px; cursor:pointer; background:var(--glass-bg); transition:0.3s;';
                if(date < today || date.getDay()===0) {
                    el.style.opacity = '0.3'; el.style.pointerEvents = 'none'; el.style.cursor = 'default';
                } else {
                    if (date.getTime() === today.getTime()) el.style.border = '1px solid var(--gold)';
                    el.addEventListener('click', () => {
                        Array.from(grid.children).forEach(c => { c.style.background = 'var(--glass-bg)'; c.style.color = 'var(--white)'; });
                        el.style.background = 'var(--gold)'; el.style.color = 'var(--navy)';
                        bookingState.d = \`\${d.toString().padStart(2,'0')}/\${(cMonth+1).toString().padStart(2,'0')}/\${cYear}\`;
                        requestAnimationFrame(() => setStep(++cStep));
                    });
                }
                grid.appendChild(el);
            }
        };
        document.getElementById('prevMonth').addEventListener('click', () => { cMonth--; if(cMonth<0){cMonth=11;cYear--;} renderCal(); });
        document.getElementById('nextMonth').addEventListener('click', () => { cMonth++; if(cMonth>11){cMonth=0;cYear++;} renderCal(); });

        document.querySelectorAll('.time-btn').forEach(b => b.addEventListener('click', () => {
            document.querySelectorAll('.time-btn').forEach(x => x.classList.remove('selected'));
            b.classList.add('selected'); bookingState.t = b.getAttribute('data-time');
            requestAnimationFrame(() => setStep(++cStep));
        }));

        document.getElementById('submitBooking').addEventListener('click', () => {
            bookingState.n = document.getElementById('patientName').value.trim();
            bookingState.p = document.getElementById('patientPhone').value.trim();
            if(!bookingState.n || !bookingState.p) return alert("Nom et téléphone requis.");
            setStep(++cStep);
            const text = \`Nouveau RDV: \${bookingState.n} - \${bookingState.s} - \${bookingState.d} - \${bookingState.t}\`;
            setTimeout(() => window.open('https://wa.me/212772153477?text=' + encodeURIComponent(text), '_blank'), 1000);
        });
    </script>
</body>
</html>
`;

// Helper: Wrap content exactly
function processHTML(bodyContent) {
    let raw = bodyContent;
    // Apply lazy loading globally before returning
    raw = raw.replace(/<img ([^>]+)>/gi, (m, g1) => {
        let n = `<img ${g1} loading="lazy" onerror="this.onerror=null;this.style.display='none';this.parentElement.style.background='#111d35';">`;
        if (g1.includes('loading="lazy"')) n = `<img ${g1} onerror="this.onerror=null;this.style.display='none';this.parentElement.style.background='#111d35';">`;
        return n;
    });
    return raw;
}

const buildPage = (filename, navActive, title, content) => {
    const fullPage = headHtml(title) + navbarHtml(navActive) + content + footerHtml + modalHtml + globalScripts;
    fs.writeFileSync(path.join(dir, filename), processHTML(fullPage), 'utf8');
}

// ---- INDEX.HTML ----

const indexContent = `
    <header class="page-hero" style="min-height: 90vh; display:flex; align-items:center;">
        <div class="container">
            <h1 class="animate-on-scroll">Retrouvez votre <span style="color:var(--gold);">sourire</span> en toute confiance</h1>
            <p class="animate-on-scroll">Cabinet dentaire moderne à Casablanca – des soins d'excellence pour toute la famille.</p>
            <div style="margin-top: 40px;" class="animate-on-scroll">
                <button class="btn-large btn-primary open-modal" style="margin: 10px;">📅 Réservez votre consultation</button>
                <a href="tel:+212772153477" class="btn-large btn-dark" style="margin: 10px; background:transparent; color:var(--white);">📞 Appelez le 0772 15 34 77</a>
            </div>
        </div>
    </header>

    <section class="section" style="background:var(--navy-light); padding:40px 0;">
        <div class="container social-proof" style="display:flex; justify-content:space-around; flex-wrap:wrap; text-align:center; gap:20px;">
            <div class="animate-on-scroll">
                <div style="font-size:2rem;">⭐</div>
                <strong style="color:var(--white);font-size:1.2rem;"><span class="counter" data-target="4.8" data-decimals>0</span>/5</strong><br><span style="color:var(--gray-light);">sur Google</span>
            </div>
            <div class="animate-on-scroll">
                <div style="font-size:2rem;">🗨️</div>
                <strong style="color:var(--white);font-size:1.2rem;"><span class="counter" data-target="20" data-plus>0</span></strong><br><span style="color:var(--gray-light);">Avis vérifiés</span>
            </div>
            <div class="animate-on-scroll">
                <div style="font-size:2rem;">💯</div>
                <strong style="color:var(--white);font-size:1.2rem;"><span class="counter" data-target="500" data-plus>0</span></strong><br><span style="color:var(--gray-light);">Patients satisfaits</span>
            </div>
            <div class="animate-on-scroll">
                <div style="font-size:2rem;">📍</div>
                <strong style="color:var(--white);font-size:1.2rem;">Casablanca</strong><br><span style="color:var(--gray-light);">Sidi Maârouf</span>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="section-title animate-on-scroll"><h2>Nos Services</h2><div class="gold-line"></div></div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:20px;">
                <div style="background:var(--navy-light); padding:30px; border-radius:16px; border:1px solid var(--glass-border); text-align:center;" class="animate-on-scroll">
                    <div style="font-size:3rem;">🦷</div><h3 style="margin:15px 0;">Implants</h3><p style="color:var(--gray-light);">Remplacement permanent garanti.</p>
                </div>
                <div style="background:var(--navy-light); padding:30px; border-radius:16px; border:1px solid var(--glass-border); text-align:center;" class="animate-on-scroll">
                    <div style="font-size:3rem;">✨</div><h3 style="margin:15px 0;">Blanchiment</h3><p style="color:var(--gray-light);">Gagnez jusqu'à 4 teintes.</p>
                </div>
                <div style="background:var(--navy-light); padding:30px; border-radius:16px; border:1px solid var(--glass-border); text-align:center;" class="animate-on-scroll">
                    <div style="font-size:3rem;">💎</div><h3 style="margin:15px 0;">Facettes</h3><p style="color:var(--gray-light);">Souriez comme une star.</p>
                </div>
                <div style="background:var(--navy-light); padding:30px; border-radius:16px; border:1px solid var(--glass-border); text-align:center;" class="animate-on-scroll">
                    <div style="font-size:3rem;">😁</div><h3 style="margin:15px 0;">Orthodontie</h3><p style="color:var(--gray-light);">Gouttières invisibles.</p>
                </div>
            </div>
            <div style="text-align:center; margin-top:40px;"><a href="services.html" class="btn-dark">Voir tous nos services →</a></div>
        </div>
    </section>
    
    <section class="section" style="background:var(--navy-light);">
        <div class="container">
            <div class="section-title animate-on-scroll"><h2>Pourquoi Nous Choisir ?</h2><div class="gold-line"></div></div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:20px;">
                <div style="text-align:center; padding:20px;" class="animate-on-scroll"><div style="font-size:3rem; margin-bottom:15px;">🛡️</div><h3>Sécurité</h3><p style="color:var(--gray-light);">Asepsie stricte.</p></div>
                <div style="text-align:center; padding:20px;" class="animate-on-scroll"><div style="font-size:3rem; margin-bottom:15px;">💯</div><h3>Qualité</h3><p style="color:var(--gray-light);">Matériaux premium.</p></div>
                <div style="text-align:center; padding:20px;" class="animate-on-scroll"><div style="font-size:3rem; margin-bottom:15px;">😁</div><h3>Confort</h3><p style="color:var(--gray-light);">Soins sans douleur.</p></div>
                <div style="text-align:center; padding:20px;" class="animate-on-scroll"><div style="font-size:3rem; margin-bottom:15px;">👨‍⚕️</div><h3>Expertise</h3><p style="color:var(--gray-light);">Expérience prouvée.</p></div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container" style="display:grid; grid-template-columns:1fr 1.5fr; gap:40px; align-items:center;">
            <div class="animate-on-scroll"><img src="dr-zahir-photo.jpg" alt="Dr Zahir" style="border-radius:20px; border:2px solid var(--gold);"></div>
            <div class="animate-on-scroll">
                <h2 style="font-size:2.5rem; margin-bottom:20px; color:var(--gold);">Dr Zahir</h2>
                <p style="color:var(--gray-light); font-size:1.1rem; margin-bottom:20px;">Votre hygiène dentaire est notre priorité absolue. Nous mettons un point d'honneur à allier professionnalisme et douceur.</p>
                <a href="cabinet.html" class="btn-dark">En savoir plus sur le cabinet →</a>
            </div>
        </div>
    </section>

    <section class="section" style="background:var(--navy-light);">
        <div class="container">
            <div class="section-title animate-on-scroll"><h2>Avis Patients</h2><div class="gold-line"></div></div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px;">
                <div style="background:var(--navy); padding:30px; border-radius:16px; border:1px solid var(--glass-border);" class="animate-on-scroll">
                    <div style="color:var(--gold); margin-bottom:10px;">⭐⭐⭐⭐⭐</div>
                    <p style="font-style:italic; color:var(--gray-light);">"Super dentiste, à l'écoute et très pro!"</p>
                    <h5 style="margin-top:10px; color:var(--white);">- Sara B.</h5>
                </div>
                <div style="background:var(--navy); padding:30px; border-radius:16px; border:1px solid var(--glass-border);" class="animate-on-scroll">
                    <div style="color:var(--gold); margin-bottom:10px;">⭐⭐⭐⭐⭐</div>
                    <p style="font-style:italic; color:var(--gray-light);">"Des résultats incroyables dès la première séance."</p>
                    <h5 style="margin-top:10px; color:var(--white);">- Omar K.</h5>
                </div>
            </div>
            <div style="text-align:center; margin-top:40px;"><a href="avis.html" class="btn-dark">Voir tous les avis →</a></div>
        </div>
    </section>

    <!-- CTA section -->
    <section class="section" style="background:var(--gold); color:var(--navy); text-align:center; padding:80px 0;">
        <div class="container animate-on-scroll">
            <h2 style="font-size:2.5rem; margin-bottom:20px;">Prêt à retrouver votre sourire ?</h2>
            <button class="btn-large open-modal" style="background:var(--navy); color:var(--white);">Réservez votre consultation</button>
        </div>
    </section>

    <section class="section">
        <div class="container" style="text-align:center;" class="animate-on-scroll">
            <h2 style="font-size:2.5rem; margin-bottom:20px;">Où nous trouver ?</h2>
            <p style="color:var(--gray-light); font-size:1.1rem; margin-bottom:10px;">N°101, Angle Bd. Qods & Bd. Cadi Ayad, Casablanca</p>
            <p style="color:var(--gold); font-size:1.5rem; font-weight:bold; margin-bottom:30px;">📞 0772 15 34 77</p>
            <a href="contact.html" class="btn-dark">Nous trouver →</a>
        </div>
    </section>
`;
buildPage('index.html', 'index', 'Accueil', indexContent);



// ---- SERVICES.HTML ----
const servicesContent = `
    <header class="page-hero">
        <div class="container">
            <h1>Nos Services</h1>
            <p>Des soins sur-mesure, indolores et esthétiques, réalisés avec les dernières technologies.</p>
            <div class="breadcrumb"><a href="index.html">Accueil</a> > Services</div>
        </div>
    </header>
    <section class="section">
        <div class="container" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px;">
            ${['🦷|Implants dentaires|Remplacez vos dents manquantes par des implants haut de gamme garantis à vie. Retrouvez le confort d\'une dentition complète.',
               '✨|Blanchiment dentaire|Un sourire éclatant en une seule séance. Gagnez jusqu\'à 4 teintes en 45 minutes sans douleur ni sensibilité.',
               '💎|Pose de facettes|Souriez comme une star hollywoodienne. Les facettes en céramique corrigent l\'alignement, la forme et la couleur.',
               '😁|Orthodontie invisible|Alignez vos dents discrètement grâce aux gouttières transparentes de dernière génération.',
               '🪥|Détartrage & Polissage|Prévenez les maladies et rafraîchissez votre haleine grâce à notre protocole ultrasonique doux.',
               '👑|Couronnes en zircone|Restaurez vos dents abîmées avec des couronnes ultra-résistantes 100% bio-compatibles.',
               '🩺|Soins conservateurs|Traitement des caries et dévitalisations indolores grâce à l\'anesthésie de dernière technologie.',
               '💉|Extractions simples|Chirurgie dentaire réalisée en toute sécurité, dans des conditions d\'asepsie conformes aux normes internationales.'
            ].map(s => {
                const [i, t, d] = s.split('|');
                return `<div style="background:var(--navy-light); padding:40px; border-radius:20px; border:1px solid var(--glass-border);" class="animate-on-scroll">
                    <div style="font-size:3.5rem; margin-bottom:20px;">${i}</div>
                    <h3 style="margin-bottom:15px; font-size:1.5rem; color:var(--white);">${t}</h3>
                    <p style="color:var(--gray-light); margin-bottom:25px;">${d}</p>
                    <button class="open-modal" style="background:none; border:1px solid var(--gold); border-radius:8px; color:var(--gold); padding:10px 20px; cursor:pointer;">Prendre rendez-vous</button>
                </div>`;
            }).join('')}
        </div>
    </section>
`;
buildPage('services.html', 'services', 'Services', servicesContent);

// ---- CABINET.HTML ----

const cabinetContent = `
    <header class="page-hero">
        <div class="container">
            <h1>Notre Cabinet</h1>
            <p>Découvrez un espace pensé pour votre confort et équipé de technologies de pointe.</p>
            <div class="breadcrumb"><a href="index.html">Accueil</a> > Le Cabinet</div>
        </div>
    </header>
    <section class="section" style="background:var(--navy);">
        <div class="container">
            <!-- Full About Dr Zahir -->
            <div style="display:grid; grid-template-columns:1fr 2fr; gap:50px; align-items:center; background:var(--navy-light); padding:40px; border-radius:20px; border:1px solid var(--glass-border); margin-bottom:80px;" class="animate-on-scroll">
                <img src="dr-zahir-photo.jpg" alt="Dr Zahir" style="border-radius:12px; width:100%; border:2px solid var(--gold);">
                <div>
                    <h2 style="color:var(--gold); margin-bottom:15px; font-size:2rem;">Dr. Mohamed Amine Zahir</h2>
                    <h4 style="color:var(--white); margin-bottom:15px;">Chirurgien-Dentiste, Implantologue</h4>
                    <p style="color:var(--gray-light); font-size:1.1rem; margin-bottom:15px;">Diplômé des meilleures facultés, le Dr Zahir allie passion et perfectionnisme. Son approche humaine et rassurante transforme votre visite chez le dentiste en une expérience sereine et sans douleur.</p>
                    <p style="color:var(--gray-light); font-size:1.1rem;">Toujours à la pointe des nouvelles technologies, il participe régulièrement à des congrès internationaux pour vous offrir les soins les plus innovants.</p>
                </div>
            </div>
            
            <h2 style="text-align:center; margin:0 0 40px; font-size:2.5rem;" class="animate-on-scroll">Galerie du Cabinet</h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px; margin-bottom:80px;">
                <img src="dr-zahirphoto-2.jpg" alt="Cabinet Accueil" style="border-radius:12px; height:250px; width:100%; object-fit:cover; border:1px solid var(--glass-border);" class="animate-on-scroll">
                <img src="zahir-pphoto.jpg" alt="Salle de Soins" style="border-radius:12px; height:250px; width:100%; object-fit:cover; border:1px solid var(--glass-border);" class="animate-on-scroll">
                <img src="celebrity-dr-zahir.jpg" alt="Patient Satisfaction" style="border-radius:12px; height:250px; width:100%; object-fit:cover; border:1px solid var(--glass-border);" class="animate-on-scroll">
                <img src="testimonial-zahir.jpg" alt="Résultats" style="border-radius:12px; height:250px; width:100%; object-fit:cover; border:1px solid var(--glass-border);" class="animate-on-scroll">
                <img src="dr-zahir-testimonial.jpg" alt="Consultation en direct" style="border-radius:12px; height:250px; width:100%; object-fit:cover; border:1px solid var(--glass-border);" class="animate-on-scroll">
            </div>

            <div class="section-title animate-on-scroll"><h2>Nos Engagements</h2><div class="gold-line"></div></div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:20px;">
                <div style="background:var(--navy-light); padding:30px; border-radius:16px; border:1px solid var(--glass-border); text-align:center;" class="animate-on-scroll">
                    <div style="font-size:3rem; margin-bottom:15px;">🛡️</div><h3 style="margin-bottom:10px;">Hygiène Absolue</h3><p style="color:var(--gray-light);">Stérilisation classe B.</p>
                </div>
                <div style="background:var(--navy-light); padding:30px; border-radius:16px; border:1px solid var(--glass-border); text-align:center;" class="animate-on-scroll">
                    <div style="font-size:3rem; margin-bottom:15px;">💎</div><h3 style="margin-bottom:10px;">Matériaux Premium</h3><p style="color:var(--gray-light);">Traçabilité à 100%.</p>
                </div>
                <div style="background:var(--navy-light); padding:30px; border-radius:16px; border:1px solid var(--glass-border); text-align:center;" class="animate-on-scroll">
                    <div style="font-size:3rem; margin-bottom:15px;">⏱️</div><h3 style="margin-bottom:10px;">Ponctualité</h3><p style="color:var(--gray-light);">Zéro temps d'attente.</p>
                </div>
            </div>
            
            <div style="text-align:center; margin-top:60px;" class="animate-on-scroll">
                <h3 style="font-size:2rem; margin-bottom:20px;">Découvrez nos espaces</h3>
                <button class="btn-large open-modal btn-primary">Prendre RDV pour visiter</button>
            </div>
        </div>
    </section>
`;
buildPage('cabinet.html', 'cabinet', 'Le Cabinet', cabinetContent);


// ---- AVIS.HTML ----
const avisContent = `
    <header class="page-hero">
        <div class="container">
            <h1>Avis Patients</h1>
            <p>⭐ 4.8/5 sur Google – L'opinion de nos patients est notre plus grande fierté.</p>
            <div class="breadcrumb"><a href="index.html">Accueil</a> > Avis</div>
        </div>
    </header>
    <section class="section">
        <div class="container" style="display:flex; flex-direction:column; gap:30px; max-width:800px;">
            ${[
                {"t": "Sara Bennani", "c": "Incroyable expérience ! Je détestais aller au dentiste, mais le Dr Zahir m'a redonné le sourire sans aucune douleur. Le résultat de mes facettes est sublime."},
                {"t": "Yasmina F.", "c": "Un cabinet très propre et moderne. L'hygiène est irréprochable et l'équipe est aux petits soins. J'ai fait un blanchiment et je suis ravie !"},
                {"t": "Omar K.", "c": "La pose de mes implants s'est déroulée à merveille. Les explications étaient claires, le suivi parfait. Je recommande à 100%."}
            ].map(a => `
                <div style="background:var(--navy-light); padding:40px; border-radius:20px; border:1px solid var(--glass-border); position:relative;" class="animate-on-scroll">
                    <div style="font-size:1.2rem; color:var(--gold); margin-bottom:15px;">⭐⭐⭐⭐⭐</div>
                    <p style="font-style:italic; font-size:1.1rem; color:var(--white); margin-bottom:20px;">"${a.c}"</p>
                    <h4 style="color:var(--gray-light);">- ${a.t}</h4>
                    <span style="position:absolute; right:30px; bottom:30px; color:var(--gray); font-size:0.9rem;">📍 Avis Google</span>
                </div>
            `).join('')}
            
            <div style="text-align:center; margin-top:40px;">
                <a href="https://g.page/review/centredentairezahir" target="_blank" class="btn-large btn-dark">Laissez votre avis sur Google</a>
            </div>
        </div>
    </section>
`;
buildPage('avis.html', 'avis', 'Avis Patients', avisContent);

// ---- CONTACT.HTML ----

const contactContent = `
    <header class="page-hero">
        <div class="container">
            <h1>Contactez-nous</h1>
            <p>Nous sommes à votre écoute pour toute question ou prise de rendez-vous.</p>
            <div class="breadcrumb"><a href="index.html">Accueil</a> > Contact</div>
        </div>
    </header>
    <section class="section">
        <div class="container" style="display:grid; grid-template-columns:1fr 1fr; gap:50px;">
            <div class="animate-on-scroll">
                <h2 style="font-size:2rem; margin-bottom:30px;">Nos Coordonnées</h2>
                <div style="display:flex; gap:20px; margin-bottom:30px;">
                    <div style="font-size:2rem;">📍</div>
                    <div>
                        <h4 style="font-size:1.2rem;">Adresse</h4>
                        <p style="color:var(--gray-light);">N°101, Angle Bd. Qods & Bd. Cadi Ayad<br>Place de Sidi Maârouf, Casablanca</p>
                    </div>
                </div>
                <div style="display:flex; gap:20px; margin-bottom:30px;">
                    <div style="font-size:2rem;">📞</div>
                    <div>
                        <h4 style="font-size:1.2rem;">Téléphone</h4>
                        <a href="tel:+212772153477" style="color:var(--gold); font-size:1.5rem; font-weight:bold;">0772 15 34 77</a>
                    </div>
                </div>
                <div style="background:var(--navy-light); padding:30px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:20px;">
                    <h4 style="margin-bottom:15px;">Horaires d'ouverture</h4>
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid var(--glass-border); padding-bottom:5px;"><span>Lundi - Samedi</span><span>09h00 - 19h00</span></div>
                    <div style="display:flex; justify-content:space-between; color:#ff6b6b;"><span>Dimanche</span><span>Fermé</span></div>
                </div>
                <a href="https://wa.me/212772153477" target="_blank" class="btn-large" style="background:#25d366; color:white; width:100%; justify-content:center;">💬 WhatsApp Dispo 24/7</a>
            </div>
            
            <div class="animate-on-scroll">
                <iframe src="https://maps.google.com/maps?q=33.5731,-7.5898&z=15&output=embed" width="100%" height="450" style="border:0;border-radius:16px;filter:invert(90%) hue-rotate(180deg) contrast(1.1); margin-bottom:30px;" allowfullscreen loading="lazy"></iframe>
                
                <h3 style="font-size:1.5rem; margin-bottom:20px; color:var(--gold);">Envoyez-nous un message</h3>
                <div style="background:var(--navy-light); padding:25px; border-radius:16px; border:1px solid var(--glass-border);">
                    <div class="form-group"><input type="text" id="cName" placeholder="Nom complet *" style="width:100%; padding:15px; border-radius:8px; background:var(--navy); border:1px solid var(--glass-border); color:var(--white);" required></div>
                    <div class="form-group" style="margin-top:15px;"><input type="tel" id="cPhone" placeholder="Téléphone *" style="width:100%; padding:15px; border-radius:8px; background:var(--navy); border:1px solid var(--glass-border); color:var(--white);" required></div>
                    <div class="form-group" style="margin-top:15px;">
                        <select id="cService" style="width:100%; padding:15px; border-radius:8px; background:var(--navy); border:1px solid var(--glass-border); color:var(--white);">
                            <option value="Information Générale">Information Générale</option>
                            <option value="Implants">Implants</option>
                            <option value="Blanchiment">Blanchiment</option>
                            <option value="Autre Soin">Autre Soin</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-top:15px;"><textarea id="cMessage" rows="3" placeholder="Votre message..." style="width:100%; padding:15px; border-radius:8px; background:var(--navy); border:1px solid var(--glass-border); color:var(--white);"></textarea></div>
                    <button class="btn-large btn-primary" id="sendContact" style="width:100%; margin-top:20px; justify-content:center;">Envoyer via WhatsApp</button>
                    <script>
                        document.getElementById('sendContact').addEventListener('click', () => {
                            const n = document.getElementById('cName').value.trim();
                            const p = document.getElementById('cPhone').value.trim();
                            const s = document.getElementById('cService').value;
                            const m = document.getElementById('cMessage').value.trim();
                            if(!n || !p) return alert("Veuillez remplir votre nom et téléphone.");
                            const text = `Nouveau Message Contact:\nNom: ${n}\nTél: ${p}\nService: ${s}\nMessage: ${m}`;
                            window.open('https://wa.me/212772153477?text=' + encodeURIComponent(text), '_blank');
                        });
                    </script>
                </div>
            </div>
        </div>
    </section>
`;
buildPage('contact.html', 'contact', 'Contact', contactContent);

