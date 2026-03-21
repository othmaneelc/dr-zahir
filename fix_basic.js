const fs = require('fs');

let html = fs.readFileSync('c:/dr.zahir/index.html', 'utf8');

// 1. Encoding Fixes
html = html.replace(/â­ /g, '⭐');
html = html.replace(/ðY-¨ï¸ /g, '✅');
html = html.replace(/ðY" /g, '📍');
html = html.replace(/ðY ?/g, '🏆');
html = html.replace(/ðY>¡ï¸ /g, '🛡️');
html = html.replace(/ðY~ /g, '😁');
html = html.replace(/PrÃªt/g, 'Prêt');
html = html.replace(/â /g, '⭐');

// Clean up weird whitespace inside replaced characters if any
html = html.replace(/ðY\?/g, '🏆');

// 2. Fix Broken Images
const imageFixes = {
    'dr zahir photo.jpg': 'dr-zahir-photo.jpg',
    'dr zahirphoto 2.jpg': 'dr-zahirphoto-2.jpg',
    'zahir pphoto.jpg': 'zahir-pphoto.jpg',
    'celebrity dr zahir.jpg': 'celebrity-dr-zahir.jpg',
    'testimonial zahir.jpg': 'testimonial-zahir.jpg',
    'dr zahir testimonial.jpg': 'dr-zahir-testimonial.jpg'
};
for (const [bad, good] of Object.entries(imageFixes)) {
    html = html.split(bad).join(good);
}

// Ensure all imgs have loading="lazy" unless they already have it
html = html.replace(/<img ([^>]+)>/g, (match, attrs) => {
    if (!attrs.includes('loading=')) {
        return `<img ${attrs} loading="lazy">`;
    }
    return match;
});

// 3. Navbar Logo & Footer Logo
// Navbar
html = html.replace(
    /<a href="#" class="nav-brand">[\s\S]*?<\/a>/,
    `<a href="#home" class="nav-brand" aria-label="Retour à l'accueil">
                <img src="dr.zahir full logo.png" alt="Centre Dentaire Zahir logo" class="navbar-logo">
            </a>`
);
// Footer Logo
html = html.replace(
    /<div class="footer-brand">[\s\S]*?<p>/,
    `<div class="footer-brand">
                <a href="#home" aria-label="Retour à l'accueil">
                    <img src="dr.zahir full logo.png" alt="Centre Dentaire Zahir logo" class="footer-logo">
                </a>
                <p>`
);

// CSS for logos
const cssLogos = `
        .navbar-logo { height: 50px; width: auto; object-fit: contain; cursor: pointer; }
        @media (max-width: 992px) { .navbar-logo { height: 40px; } }
        .footer-logo { height: 60px; width: auto; object-fit: contain; margin-bottom: 20px; }
`;
html = html.replace('/* Navbar */', cssLogos + '\n        /* Navbar */');

// 4. Broken Images JS Fallback
const fallbackScript = `
        // Image Fallback
        document.querySelectorAll('img').forEach(img => {
            img.onerror = function() {
                const div = document.createElement('div');
                div.style.cssText = 'background: #111d35; border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #c8a456; font-size: 2rem; flex-direction: column; width: ' + (this.width || 100) + 'px; height: ' + (this.height || 100) + 'px; text-align: center;';
                div.innerHTML = '📷<br><span style="font-size: 1rem; margin-top: 10px;">' + (this.alt || 'Image') + '</span>';
                this.replaceWith(div);
            };
        });
`;
html = html.replace(/<\/body>/, `${fallbackScript}\n    </body>`);

// 5. Remove Logo from Gallery
html = html.replace(/<a href="#img6" class="gallery-item animate-on-scroll" style="transition-delay: 0\.2s;">[\s\S]*?<\/a>/, '');
html = html.replace(/<div id="img6" class="lightbox">[\s\S]*?<\/div>/, '');

// 6. IntersectionObserver for Sticky Navbar
const navScrollListener = `// Sticky Navbar
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });`;
const navObserver = `// Sticky Navbar via Observer
        const headerObserver = new IntersectionObserver((entries) => {
            const navbar = document.getElementById('navbar');
            if (!entries[0].isIntersecting) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { threshold: 0 });
        const dummyHero = document.createElement('div');
        dummyHero.style.position = 'absolute';
        dummyHero.style.top = '0';
        dummyHero.style.height = '50px';
        dummyHero.style.width = '100%';
        document.body.prepend(dummyHero);
        headerObserver.observe(dummyHero);
`;
html = html.replace(navScrollListener, navObserver);

// Fix aria-labels
html = html.replace(/<a href="#services">/, '<a href="#services" aria-label="Services">');
html = html.replace(/<a href="#about">/, '<a href="#about" aria-label="A propos">');
html = html.replace(/<a href="#notre-cabinet">/, '<a href="#notre-cabinet" aria-label="Cabinet">');
html = html.replace(/<a href="#avis">/, '<a href="#avis" aria-label="Avis">');
html = html.replace(/<a href="#contact">/, '<a href="#contact" aria-label="Contact">');
html = html.replace(/<button class="nav-cta open-modal">/, '<button class="nav-cta open-modal" aria-label="Rendez-vous">');

// Hamburger Menu Close on Click
html = html.replace(
    /hamburger\.addEventListener\('click', \(\) => { navLinks\.classList\.toggle\('active'\); }\);/,
    `hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); });\n        navLinks.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { navLinks.classList.remove('active'); }); });`
);

fs.writeFileSync('c:/dr.zahir/index.html', html, 'utf8');
