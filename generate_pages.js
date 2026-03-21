const fs = require('fs');

let sourceHtml = fs.readFileSync('c:/dr.zahir/index.html', 'utf8');

// Extra check for broken encoding just in case
sourceHtml = sourceHtml.replace(/â­ /g, '⭐');
sourceHtml = sourceHtml.replace(/ðY-¨ï¸ /g, '✅');
sourceHtml = sourceHtml.replace(/ðY" /g, '📍');
sourceHtml = sourceHtml.replace(/ðY\?/g, '🏆');
sourceHtml = sourceHtml.replace(/ðY\?\?/g, '🏆');
sourceHtml = sourceHtml.replace(/ðY>¡ï¸ /g, '🛡️');
sourceHtml = sourceHtml.replace(/ðY~/g, '😁');
sourceHtml = sourceHtml.replace(/PrÃªt/g, 'Prêt');
sourceHtml = sourceHtml.replace(/â /g, '⭐');
sourceHtml = sourceHtml.replace(/ðY/g, '🌟'); // fallback for any missed ones

// We extract layout components to reuse them in other pages
const headStart = sourceHtml.indexOf('<head>');
const headEnd = sourceHtml.indexOf('</head>') + 7;
let originalHead = sourceHtml.substring(headStart, headEnd);

// Navigation links need to be updated to relative URLs
const updatedHead = originalHead;

const navStart = sourceHtml.indexOf('<!-- Navbar -->');
const navEnd = sourceHtml.indexOf('<!-- Hero -->');
let navbar = sourceHtml.substring(navStart, navEnd);

// Replace links in Navbar
navbar = navbar.replace(/href="#home"/g, 'href="index.html"');
navbar = navbar.replace(/href="#services"/g, 'href="services.html"');
navbar = navbar.replace(/href="#about"/g, 'href="about.html"');
navbar = navbar.replace(/href="#notre-cabinet"/g, 'href="cabinet.html"');
navbar = navbar.replace(/href="#contact"/g, 'href="contact.html"');

const footerStart = sourceHtml.indexOf('<footer class="footer"');
const footerEnd = sourceHtml.indexOf('</footer>') + 9;
let footer = sourceHtml.substring(footerStart, footerEnd);
footer = footer.replace(/href="#home"/g, 'href="index.html"');
footer = footer.replace(/href="#services"/g, 'href="services.html"');
footer = footer.replace(/href="#notre-cabinet"/g, 'href="cabinet.html"');

const floatingStart = sourceHtml.indexOf('<!-- Floating Buttons -->');
const floatingEnd = sourceHtml.indexOf('<!-- Custom Booking Modal -->');
let floatingBtns = sourceHtml.substring(floatingStart, floatingEnd);

const modalStart = sourceHtml.indexOf('<!-- Custom Booking Modal -->');
let modalAndScripts = sourceHtml.substring(modalStart);
modalAndScripts = modalAndScripts.replace(/href="#home"/g, 'href="index.html"'); // Just in case

const templateStart = `<!DOCTYPE html>
<html lang="fr">
${updatedHead}
<body>
${navbar}
`;

const templateEnd = `
${footer}
${floatingBtns}
${modalAndScripts}
`;

// Modify links in the main index.html as well!
let modifiedIndexHtml = sourceHtml.replace(sourceHtml.substring(navStart, navEnd), navbar);
modifiedIndexHtml = modifiedIndexHtml.replace(sourceHtml.substring(footerStart, footerEnd), footer);
// Link specific service cards in index to new service pages
const serviceLinks = {
    'Implants dentaires': 'service-implants.html',
    'Blanchiment dentaire': 'service-blanchiment.html',
    'Pose de facettes': 'service-facettes.html',
    'Orthodontie invisible': 'service-orthodontie.html',
    'Détartrage & Polissage': 'service-detartrage.html',
    'Couronnes en zircone': 'service-couronnes.html',
    'Soins conservateurs': 'service-caries.html',
    'Extractions simples & dents de sagesse': 'service-extraction.html'
};

for (const [sName, sLink] of Object.entries(serviceLinks)) {
    const r = new RegExp(`<h3>${sName}</h3>\\s*<p>[\\s\\S]*?</p>\\s*<a href="[^"]*" class="service-link">`);
    modifiedIndexHtml = modifiedIndexHtml.replace(r, match => {
        return match.replace(/href="[^"]*"/, `href="${sLink}"`);
    });
}
fs.writeFileSync('c:/dr.zahir/index.html', modifiedIndexHtml, 'utf8');


// Helper function to build a page
function createPage(filename, title, content) {
    let specificHead = updatedHead.replace(/<title>.*?<\/title>/, `<title>${title} | Centre Dentaire Zahir</title>`);
    let pageHtml = `<!DOCTYPE html>\n<html lang="fr">\n${specificHead}\n<body>\n${navbar}\n<div style="padding-top: 100px;"></div>\n${content}\n${templateEnd}`;
    fs.writeFileSync(`c:/dr.zahir/${filename}`, pageHtml, 'utf8');
}

// 1. ABOUT PAGE
const aboutSectionStart = sourceHtml.indexOf('<!-- Minimal About -->');
const aboutSectionEnd = sourceHtml.indexOf('<!-- Gallery (NEW) -->');
let aboutContent = sourceHtml.substring(aboutSectionStart, aboutSectionEnd);
// Enhance about content slightly for dedicated page padding
aboutContent = aboutContent.replace(/padding: 80px 0;/, 'padding: 120px 0 80px;');
createPage('about.html', 'Dr. Zahir', aboutContent);

// 2. CABINET PAGE
const cabinetSectionStart = sourceHtml.indexOf('<!-- Gallery (NEW) -->');
const cabinetSectionEnd = sourceHtml.indexOf('<!-- Testimonials -->');
let cabinetContent = sourceHtml.substring(cabinetSectionStart, cabinetSectionEnd);
cabinetContent = cabinetContent.replace(/padding: 100px 0;/, 'padding: 120px 0 100px;');
createPage('cabinet.html', 'Notre Cabinet', cabinetContent);

// 3. CONTACT PAGE
const contactSectionStart = sourceHtml.indexOf('<!-- Contact & Map -->');
const contactSectionEnd = sourceHtml.indexOf('<footer');
let contactContent = sourceHtml.substring(contactSectionStart, contactSectionEnd);
contactContent = contactContent.replace(/padding: 100px 0;/, 'padding: 120px 0 100px;');
createPage('contact.html', 'Contact', contactContent);

// 4. SERVICES MAIN PAGE
const servicesSectionStart = sourceHtml.indexOf('<!-- Services -->');
const servicesSectionEnd = sourceHtml.indexOf('<!-- Why Us -->');
let servicesContent = sourceHtml.substring(servicesSectionStart, servicesSectionEnd);
for (const [sName, sLink] of Object.entries(serviceLinks)) {
    const r = new RegExp(`<h3>${sName}</h3>\\s*<p>[\\s\\S]*?</p>\\s*<a href="[^"]*" class="service-link">`);
    servicesContent = servicesContent.replace(r, match => {
        return match.replace(/href="[^"]*"/, `href="${sLink}"`);
    });
}
createPage('services.html', 'Nos Services', servicesContent);

// 5. INDIVIDUAL SERVICE PAGES
const serviceDetails = {
    'service-implants.html': { t: 'Implants Dentaires', i: '🦷', d: "L'implantologie est la solution la plus pérenne pour remplacer une dent manquante. Au Centre Dentaire Zahir, nous utilisons des implants haut de gamme en titane pur, parfaitement bio-compatibles." },
    'service-blanchiment.html': { t: 'Blanchiment Dentaire', i: '✨', d: "Grâce à notre technologie de blanchiment par lampe LED dernière génération, retrouvez un sourire éclatant en moins d'une heure. Sans douleur et totalement sûr pour votre émail." },
    'service-facettes.html': { t: 'Pose de Facettes', i: '💎', d: "Les facettes dentaires en porcelaine ultra-fines (Hollywood Smile) transforment votre sourire. Elles corrigent l'alignement, la teinte, et la forme de vos dents de manière permanente." },
    'service-orthodontie.html': { t: 'Orthodontie Invisible', i: '😁', d: "Alignez vos dents sans bagues métalliques. Nos aligneurs transparents sur-mesure sont quasi-invisibles, confortables, et peuvent être retirés pour manger." },
    'service-detartrage.html': { t: 'Détartrage & Polissage', i: '🪥', d: "Un soin essentiel pour préserver vos gencives et prévenir le déchaussement. Notre détartrage ultrasonique garantit un nettoyage en profondeur tout en douceur." },
    'service-couronnes.html': { t: 'Couronnes en zircone', i: '👑', d: "La zircone est le summum de l'esthétique dentaire. Ces couronnes reproduisent à la perfection la translucidité d'une vraie dent, tout en offrant une solidité exceptionnelle." },
    'service-caries.html': { t: 'Soins Conservateurs', i: '🩺', d: "Nous traitons vos caries avec des composites esthétiques qui se fondent invisiblement avec l'email naturel de vos dents. Notre anesthésie de pointe rend le soin totalement indolore." },
    'service-extraction.html': { t: 'Extractions & Dents de Sagesse', i: '💉', d: "La chirurgie dentaire est réalisée en bloc opératoire aséptisé. Le Dr Zahir excelle dans les extractions complexes avec un suivi post-opératoire strict pour éviter toute complication." }
};

for (const [pageFile, info] of Object.entries(serviceDetails)) {
    const content = `
    <section class="section">
        <div class="container" style="max-width: 800px; text-align: center; padding: 40px 0;">
            <div style="font-size: 5rem; margin-bottom: 20px;">${info.i}</div>
            <h1 style="font-size: 3rem; margin-bottom: 20px; font-family: var(--heading); color: var(--gold);">${info.t}</h1>
            <p style="font-size: 1.2rem; color: var(--gray-light); line-height: 1.8; margin-bottom: 40px;">${info.d}</p>
            <div style="background: var(--navy-light); padding: 40px; border-radius: 20px; border: 1px solid var(--glass-border); text-align: left;">
                <h3 style="color: var(--white); margin-bottom: 20px;">Pourquoi choisir le Centre Dentaire Zahir pour ce soin ?</h3>
                <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px; color: var(--gray-light);">
                    <li style="display: flex; gap: 10px;">✅ <span>Diagnostic gratuit incluant radiographie panoramique.</span></li>
                    <li style="display: flex; gap: 10px;">✅ <span>Matériaux haut de gamme et certifiés CE.</span></li>
                    <li style="display: flex; gap: 10px;">✅ <span>Protocole de stérilisation strict (Norme Classe B).</span></li>
                    <li style="display: flex; gap: 10px;">✅ <span>Accompagnement et suivi personnalisé post-traitement.</span></li>
                </ul>
            </div>
            <div style="margin-top: 50px;">
                <button class="btn-large btn-primary open-modal" aria-label="Prendre rendez-vous">📅 Prendre Rendez-vous</button>
            </div>
        </div>
    </section>`;
    createPage(pageFile, info.t, content);
}
