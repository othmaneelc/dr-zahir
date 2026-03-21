const fs = require('fs');

let html = fs.readFileSync('c:/dr.zahir/index.html', 'utf8');

// Fix trailing divs
html = html.replace('</div>\n    </div>\n\n    <!-- Scripts -->', '</div>\n\n    <!-- Scripts -->');
html = html.replace('</div>\n    </div>\n    </div>\n\n    <!-- Scripts -->', '</div>\n    </div>\n\n    <!-- Scripts -->');

// Replace the old Calendly Javascript and broken fallback JS tag
const oldJsRegex = /\/\/ Calendly Modal Logic\s*const modal = document\.getElementById\('calendlyModal'\);[\s\S]*?<\/html>/;

const newJs = `// Custom Booking Logic
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
                if(closeModalBtn) closeModalBtn.style.display = 'flex';
                if(backBtn) backBtn.style.display = step > 1 ? 'block' : 'none';
            } else {
                document.getElementById('stepIndicator').style.display = 'none';
                if(closeModalBtn) closeModalBtn.style.display = 'none';
                if(backBtn) backBtn.style.display = 'none';
                if(document.getElementById('spacerBtn')) document.getElementById('spacerBtn').style.display = 'none';
            }
        };

        const closeAllModal = () => {
            if (bookingModal) bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (bookingModal) {
                bookingModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                currentStep = 1;
                changeStep(currentStep);
                renderCalendar();
            }
        }));

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeAllModal);
        if (closeFinalBtn) closeFinalBtn.addEventListener('click', closeAllModal);
        if (bookingModal) {
            bookingModal.addEventListener('click', (e) => {
                if (e.target === bookingModal && currentStep < 5) closeAllModal();
            });
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if(currentStep > 1) {
                    currentStep--;
                    changeStep(currentStep);
                }
            });
        }

        // Step 1: Service
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                bookingState.service = btn.getAttribute('data-service');
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
            if (!calGrid) return;
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
                } else if(dayDate.getTime() === today.getTime() && dayOfWeek !== 0) {
                    btn.classList.add('today');
                }
                
                if(btn.classList.contains('selectable')) {
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.cal-day').forEach(b => b.classList.remove('selected'));
                        btn.classList.add('selected');
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

        const prevMonthBtn = document.getElementById('prevMonth');
        if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => {
            currentCalMonth--;
            if(currentCalMonth < 0) { currentCalMonth = 11; currentCalYear--; }
            renderCalendar();
        });
        const nextMonthBtn = document.getElementById('nextMonth');
        if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => {
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
        if (submitBooking) {
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
                setTimeout(() => {
                    window.open(\`https://wa.me/212772153477?text=\${encodeURIComponent(message)}\`, '_blank');
                }, 1200);
            });
        }

        // Image Fallback
        document.querySelectorAll('img').forEach(img => {
            img.onerror = function() {
                const div = document.createElement('div');
                div.style.cssText = 'background: #111d35; border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #c8a456; font-size: 2rem; flex-direction: column; width: ' + (this.width || 100) + 'px; height: ' + (this.height || 100) + 'px; text-align: center;';
                div.innerHTML = '📷<br><span style="font-size: 1rem; margin-top: 10px;">' + (this.alt || 'Image') + '</span>';
                this.replaceWith(div);
            };
        });
    </script>
</body>
</html>`;

html = html.replace(oldJsRegex, newJs);

// Final sanity check for double </div> due to prior scripts
html = html.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Scripts -->/g, '</div>\n        </div>\n    </div>\n    <!-- Scripts -->');
html = html.replace(/<\/div>\s*<\/div>\s*<!-- Scripts -->/g, '</div>\n        </div>\n    </div>\n    <!-- Scripts -->');
html = html.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Scripts -->/g, '</div>\n        </div>\n    </div>\n    <!-- Scripts -->');

fs.writeFileSync('c:/dr.zahir/index.html', html, 'utf8');
