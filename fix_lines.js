const fs = require('fs');
let text = fs.readFileSync('c:/dr.zahir/index.html', 'utf8');
let lines = text.split(/\r?\n/);

lines[282] = '                <div class="proof-icon">⭐</div>';
lines[286] = '                <div class="proof-icon">💬</div>';
lines[294] = '                <div class="proof-icon">📍</div>';
lines[329] = '                    <div class="service-icon">😁</div>';
lines[370] = '                    <span class="why-icon">🏆</span>';
lines[380] = '                    <span class="why-icon">🛡️</span>';
lines[504] = '                        <div class="contact-icon">📍</div>';
lines[507] = '                            <p>N°101, Angle Bd. Qods & Bd. Cadi Ayad<br>Étage n°1, Place de Sidi Maârouf<br>Casablanca 20150</p>';
lines[555] = '                    <a href="https://maps.google.com/maps?q=Centre+Dentaire+Zahir+Casablanca" target="_blank">📍 Voir sur Google Maps</a>';
lines[571] = '            <button class="modal-close" id="closeModal" aria-label="Fermer">×</button>';

fs.writeFileSync('c:/dr.zahir/index.html', lines.join('\n'));
console.log("Lines fixed successfully");
