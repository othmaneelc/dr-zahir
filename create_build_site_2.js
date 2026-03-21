const fs = require('fs');
const path = require('path');
const dir = 'c:/dr.zahir';

let raw = fs.readFileSync(path.join(dir, 'build_site.js'), 'utf8');

// We need to redefine indexContent, cabinetContent, and contactContent perfectly.
const newIndex = `
const indexContent = \`
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
\`;
buildPage('index.html', 'index', 'Accueil', indexContent);

`;

const newContact = `
const contactContent = \`
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
                            const text = \`Nouveau Message Contact:\\nNom: \${n}\\nTél: \${p}\\nService: \${s}\\nMessage: \${m}\`;
                            window.open('https://wa.me/212772153477?text=' + encodeURIComponent(text), '_blank');
                        });
                    </script>
                </div>
            </div>
        </div>
    </section>
\`;
buildPage('contact.html', 'contact', 'Contact', contactContent);
`;

const newCabinet = `
const cabinetContent = \`
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
\`;
buildPage('cabinet.html', 'cabinet', 'Le Cabinet', cabinetContent);
`;


// Let's replace the script chunks safely in build_site.js 
raw = raw.replace(/const indexContent \= `[\s\S]*?buildPage\('index\.html', 'index', 'Accueil', indexContent\);/, newIndex);
raw = raw.replace(/const contactContent \= `[\s\S]*?buildPage\('contact\.html', 'contact', 'Contact', contactContent\);/, newContact);
raw = raw.replace(/const cabinetContent \= `[\s\S]*?buildPage\('cabinet\.html', 'cabinet', 'Le Cabinet', cabinetContent\);/, newCabinet);

fs.writeFileSync('c:/dr.zahir/build_site_2.js', raw, 'utf8');

// Additionally, for the counter animation logic that was missing from globalScripts!
// Replace the empty IntersectionObserver with the full logic.
let raw2 = fs.readFileSync('c:/dr.zahir/build_site_2.js', 'utf8');
const oldObserver = `        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        });`;
const newObserver = `        const scrollObserver = new IntersectionObserver((entries) => {
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
        });`;
raw2 = raw2.replace(oldObserver, newObserver);
fs.writeFileSync('c:/dr.zahir/build_site_2.js', raw2, 'utf8');

