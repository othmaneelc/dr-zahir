const fs = require('fs');

let html = fs.readFileSync('c:/dr.zahir/index.html', 'utf8');

// 1. Remove Calendly CSS
html = html.replace(/\/\* Calendly Modal \*\/[\s\S]*?\.calendly-inline-widget \{ width: 100\%; height: 100\%; \}/, '/* Custom Booking Widget */\n');

// 2. Remove Calendly HTML
const calendlyHtmlRegex = /<!-- Calendly Modal -->[\s\S]*?<div class="calendly-inline-widget"[\s\S]*?<\/div>\s*<\/div>/;
// 3. Remove Calendly Script
html = html.replace(/<script type="text\/javascript" src="https:\/\/assets\.calendly\.com\/assets\/external\/widget\.js" async><\/script>/, '');

const customCss = `
        /* Custom Booking Widget Styles */
        .modal { position: fixed; inset: 0; background: var(--overlay); z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: 0.4s; padding: 20px; backdrop-filter: blur(5px); }
        .modal.active { opacity: 1; pointer-events: auto; }
        .booking-box { width: 100%; max-width: 520px; border-radius: 20px; background: var(--navy); border-top: 4px solid var(--gold); padding: 25px; position: relative; max-height: 90vh; overflow-y: auto; text-align: center; }
        .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .back-btn { background: none; border: none; color: var(--gold); font-size: 1.5rem; cursor: pointer; width: 24px; display: none; }
        .step-indicator { display: flex; gap: 8px; margin: 0 auto; }
        .step-indicator .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--glass-border); transition: 0.3s; }
        .step-indicator .dot.active { background: var(--gold); }
        .modal-close { position: absolute; top: 15px; right: 20px; font-size: 2rem; color: #fff; background: none; border: none; cursor: pointer; z-index: 10; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .modal-close:hover { color: var(--gold); }
        .step { display: none; animation: slideIn 0.3s forwards; }
        .step.active { display: block; }
        .step h3 { margin-bottom: 20px; font-size: 1.3rem; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        
        /* Grid */
        .service-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        @media (max-width: 400px) { .service-grid { grid-template-columns: 1fr; } }
        .service-btn { background: var(--navy-light); border: 1px solid var(--glass-border); padding: 15px; border-radius: 12px; color: var(--white); font-family: var(--body); font-size: 1rem; cursor: pointer; transition: 0.3s; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .service-btn:hover, .service-btn.selected { border-color: var(--gold); }
        .service-btn.selected { background: rgba(200,164,86,0.1); }
        
        /* Calendar */
        .custom-calendar { background: var(--navy-light); border-radius: 12px; padding: 15px; }
        .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-weight: 600; color: var(--gold); font-size: 1.1rem; }
        .cal-nav { background: none; border: none; color: var(--gold); font-size: 1.5rem; cursor: pointer; padding: 0 10px; }
        .cal-days-header { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; color: var(--gray); font-size: 0.85rem; margin-bottom: 10px; }
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
        .cal-day { display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 8px; font-size: 0.95rem; }
        .cal-day.selectable { cursor: pointer; transition: 0.3s; background: var(--glass-bg); }
        .cal-day.selectable:hover { background: var(--gold-glow); }
        .cal-day.today { border: 1px solid var(--gold); }
        .cal-day.selected { background: var(--gold); color: var(--navy); font-weight: 600; }
        .cal-day.disabled { color: var(--gray-light); opacity: 0.3; }
        
        /* Time Slots */
        .time-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        @media (max-width: 400px) { .time-grid { grid-template-columns: repeat(2, 1fr); } }
        .time-btn { background: var(--navy-light); border: 1px solid var(--glass-border); padding: 12px; border-radius: 10px; color: var(--white); cursor: pointer; transition: 0.3s; font-size: 1.05rem; font-weight: 500;}
        .time-btn:hover, .time-btn.selected { border-color: var(--gold); }
        .time-btn.selected { background: var(--gold); color: var(--navy); }
        
        /* Form */
        .form-group { margin-bottom: 15px; text-align: left; }
        .form-group label { display: block; margin-bottom: 6px; font-size: 0.9rem; color: var(--gray-light); }
        .form-group input, .form-group textarea { width: 100%; background: var(--navy-light); border: 1px solid var(--glass-border); padding: 12px 15px; border-radius: 8px; color: var(--white); font-family: var(--body); }
        .form-group input:focus, .form-group textarea:focus { border-color: var(--gold); outline: none; }
        .btn-submit-booking { display: block; width: 100%; background: var(--gold); color: var(--navy); padding: 15px; border-radius: 8px; font-weight: 600; border: none; cursor: pointer; margin-top: 20px; font-size: 1.05rem; transition: 0.3s; }
        .btn-submit-booking:hover { background: var(--gold-light); transform: translateY(-2px); }
        
        /* Success */
        .success-icon-wrap { width: 80px; height: 80px; margin: 0 auto 20px; }
        .checkmark__circle { stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 2; stroke-miterlimit: 10; stroke: #4CAF50; fill: none; animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
        .checkmark { width: 100%; height: 100%; border-radius: 50%; display: block; stroke-width: 2; stroke: #fff; stroke-miterlimit: 10; margin: 10% auto; box-shadow: inset 0px 0px 0px #4CAF50; animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both; }
        .checkmark__check { transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; }
        @keyframes stroke { 100% { stroke-dashoffset: 0; } }
        @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
        @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 50px #4CAF50; } }
        
        .booking-summary { background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 0.95rem; text-align: left; border-left: 3px solid var(--gold); }
        .success-buttons { display: flex; gap: 10px; flex-wrap: wrap; }
        .success-buttons button, .success-buttons a { flex: 1; min-width: 140px; text-align: center; padding: 12px; border-radius: 8px; font-weight: 600; text-decoration: none; border: none; cursor: pointer; transition: 0.3s; }
        .btn-close-final { background: var(--navy-light); color: var(--white); border: 1px solid var(--glass-border) !important; }
        .btn-close-final:hover { background: rgba(255,255,255,0.1); }
        .btn-call-now { background: #4CAF50; color: white; }
        .btn-call-now:hover { background: #45a049; }`;

html = html.replace('/* Custom Booking Widget */\n', customCss);

const customWidgetHtml = `
    <!-- Custom Booking Modal -->
    <div class="modal" id="bookingModal">
        <div class="booking-box">
            <button class="modal-close" id="closeModal" aria-label="Fermer">×</button>
            <div class="modal-header">
                <button class="back-btn" id="backBtn" aria-label="Retour">&larr;</button>
                <div class="step-indicator" id="stepIndicator">
                    <span class="dot active"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <!-- Spacer for centering -->
                <div style="width: 24px; visibility: hidden;" id="spacerBtn"></div>
            </div>
            
            <div class="step-container">
                <!-- STEP 1: Service -->
                <div class="step step-1 active">
                    <h3>Choisissez un service</h3>
                    <div class="service-grid">
                        <button class="service-btn" data-service="Implants">🦷<br>Implants</button>
                        <button class="service-btn" data-service="Blanchiment">✨<br>Blanchiment</button>
                        <button class="service-btn" data-service="Facettes">💎<br>Facettes</button>
                        <button class="service-btn" data-service="Orthodontie">😁<br>Orthodontie</button>
                        <button class="service-btn" data-service="Détartrage">🪥<br>Détartrage</button>
                        <button class="service-btn" data-service="Couronnes">👑<br>Couronnes</button>
                        <button class="service-btn" data-service="Soins de caries">🩺<br>Soins de caries</button>
                        <button class="service-btn" data-service="Extraction">💉<br>Extraction</button>
                    </div>
                </div>
                
                <!-- STEP 2: Date -->
                <div class="step step-2">
                    <h3>Choisissez une date</h3>
                    <div class="custom-calendar">
                        <div class="cal-header">
                            <button class="cal-nav" id="prevMonth" aria-label="Mois précédent">&larr;</button>
                            <span id="monthYearDisplay"></span>
                            <button class="cal-nav" id="nextMonth" aria-label="Mois suivant">&rarr;</button>
                        </div>
                        <div class="cal-days-header">
                            <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
                        </div>
                        <div class="cal-grid" id="calGrid"></div>
                    </div>
                </div>
                
                <!-- STEP 3: Time -->
                <div class="step step-3">
                    <h3>Choisissez une heure</h3>
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
                
                <!-- STEP 4: Info -->
                <div class="step step-4">
                    <h3>Vos informations</h3>
                    <div class="form-group">
                        <label>Nom complet *</label>
                        <input type="text" id="patientName" required placeholder="Votre nom complet" aria-label="Nom complet">
                    </div>
                    <div class="form-group">
                        <label>Téléphone *</label>
                        <input type="tel" id="patientPhone" required placeholder="06XXXXXXXX" aria-label="Téléphone">
                    </div>
                    <div class="form-group">
                        <label>Message (optionnel)</label>
                        <textarea id="patientMessage" rows="2" placeholder="Notes additionnelles" aria-label="Message optionnel"></textarea>
                    </div>
                    <button class="btn-submit-booking" id="submitBooking" aria-label="Confirmer le rendez-vous">Confirmer le rendez-vous</button>
                </div>
                
                <!-- STEP 5: Success -->
                <div class="step step-5">
                    <div class="success-icon-wrap">
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <h3>Demande envoyée !</h3>
                    <p>Nous vous contacterons dans l'heure pour confirmer votre rendez-vous.</p>
                    <div class="booking-summary" id="bookingSummary"></div>
                    <div class="success-buttons">
                        <button class="btn-close-final" id="closeFinalBtn" aria-label="Fermer">Fermer</button>
                        <a href="tel:+212772153477" class="btn-call-now" aria-label="Appeler maintenant">📞 Appeler maintenant</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

html = html.replace(calendlyHtmlRegex, customWidgetHtml);

const customWidgetScript = `
        // Custom Booking Logic
        const bookingState = { service: '', date: '', time: '', name: '', phone: '' };
        let currentStep = 1;

        const bookingModal = document.getElementById('bookingModal');
        const openModalBtns = document.querySelectorAll('.open-modal');
        const closeModalBtn = document.getElementById('closeModal');
        const backBtn = document.getElementById('backBtn');
        const stepsContainer = document.querySelectorAll('.step');
        const dotsNav = document.querySelectorAll('.step-indicator .dot');
        const submitBooking = document.getElementById('submitBooking');
        const closeFinalBtn = document.getElementById('closeFinalBtn');
        
        const changeStep = (step) => {
            stepsContainer.forEach((s, idx) => {
                s.classList.remove('active');
                if(idx < 4) dotsNav[idx].classList.remove('active');
            });
            stepsContainer[step - 1].classList.add('active');
            if(step <= 4) {
                for(let i=0; i<step; i++) dotsNav[i].classList.add('active');
                document.getElementById('stepIndicator').style.display = 'flex';
                closeModalBtn.style.display = 'flex';
                backBtn.style.display = step > 1 ? 'block' : 'none';
            } else {
                document.getElementById('stepIndicator').style.display = 'none';
                closeModalBtn.style.display = 'none';
                backBtn.style.display = 'none';
                document.getElementById('spacerBtn').style.display = 'none';
            }
        };

        const closeAllModal = () => {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            currentStep = 1;
            changeStep(currentStep);
            renderCalendar();
        }));

        closeModalBtn.addEventListener('click', closeAllModal);
        closeFinalBtn.addEventListener('click', closeAllModal);
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal && currentStep < 5) closeAllModal();
        });

        backBtn.addEventListener('click', () => {
            if(currentStep > 1) {
                currentStep--;
                changeStep(currentStep);
            }
        });

        // Step 1: Service
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                bookingState.service = btn.getAttribute('data-service');
                // No delay, direct transition
                requestAnimationFrame(() => {
                    currentStep++;
                    changeStep(currentStep);
                });
            });
        });

        // Step 2: Calendar
        let currentCalMonth = new Date().getMonth();
        let currentCalYear = new Date().getFullYear();
        
        const renderCalendar = () => {
            const calGrid = document.getElementById('calGrid');
            calGrid.innerHTML = '';
            const firstDayIndex = new Date(currentCalYear, currentCalMonth, 1).getDay();
            const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
            let skipDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
            
            const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
            document.getElementById('monthYearDisplay').innerText = monthNames[currentCalMonth] + ' ' + currentCalYear;
            
            for(let i=0; i<skipDays; i++) {
                calGrid.innerHTML += '<div class="cal-day"></div>';
            }
            
            const today = new Date();
            today.setHours(0,0,0,0);
            
            for(let d=1; d<=daysInMonth; d++) {
                const dayDate = new Date(currentCalYear, currentCalMonth, d);
                const dayOfWeek = dayDate.getDay();
                const btn = document.createElement('div');
                btn.className = 'cal-day selectable';
                btn.innerText = d;
                
                if(dayDate < today || dayOfWeek === 0) {
                    btn.className = 'cal-day disabled';
                }
                if(dayDate.getTime() === today.getTime() && dayOfWeek !== 0) {
                    btn.classList.add('today');
                }
                
                if(btn.classList.contains('selectable')) {
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.cal-day').forEach(b => b.classList.remove('selected'));
                        btn.classList.add('selected');
                        // format DD/MM/YYYY
                        bookingState.date = \`\${d.toString().padStart(2, '0')}/\${(currentCalMonth+1).toString().padStart(2, '0')}/\${currentCalYear}\`;
                        requestAnimationFrame(() => {
                            currentStep++;
                            changeStep(currentStep);
                        });
                    });
                }
                calGrid.appendChild(btn);
            }
        };

        document.getElementById('prevMonth').addEventListener('click', () => {
            currentCalMonth--;
            if(currentCalMonth < 0) { currentCalMonth = 11; currentCalYear--; }
            renderCalendar();
        });
        document.getElementById('nextMonth').addEventListener('click', () => {
            currentCalMonth++;
            if(currentCalMonth > 11) { currentCalMonth = 0; currentCalYear++; }
            renderCalendar();
        });

        // Step 3: Time
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                bookingState.time = btn.getAttribute('data-time');
                requestAnimationFrame(() => {
                    currentStep++;
                    changeStep(currentStep);
                });
            });
        });

        // Step 4: Submit
        submitBooking.addEventListener('click', () => {
            const name = document.getElementById('patientName').value.trim();
            const phone = document.getElementById('patientPhone').value.trim();
            
            if(!name || !phone) {
                alert("Veuillez remplir votre nom et votre numéro de téléphone.");
                return;
            }
            bookingState.name = name;
            bookingState.phone = phone;
            
            document.getElementById('bookingSummary').innerHTML = \`
                <strong>Service:</strong> \${bookingState.service}<br>
                <strong>Date:</strong> \${bookingState.date}<br>
                <strong>Heure:</strong> \${bookingState.time}\`;
                
            currentStep++;
            changeStep(currentStep);
            
            const message = \`Nouveau RDV demandé: \${bookingState.name} - \${bookingState.service} - \${bookingState.date} - \${bookingState.time}\`;
            // Add a small delay for animation UX
            setTimeout(() => {
                window.open(\`https://wa.me/212772153477?text=\${encodeURIComponent(message)}\`, '_blank');
            }, 1200);
        });
`;

html = html.replace(/\/\/ Calendly Modal Logic[\s\S]*?if \(e\.target === modal\) closeModal\(\);\n        \}\);/, customWidgetScript);

// Cleanup Calendly calls
// e.g. .calendly-inline-widget might still exist
// Ensure we update all .open-modal listeners. We replaced them above.

fs.writeFileSync('c:/dr.zahir/index.html', html, 'utf8');
