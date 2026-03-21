const fs = require('fs');

try {
    const str = fs.readFileSync('c:/dr.zahir/index.html', 'utf8');
    const bytes = new Uint8Array(str.length);
    let valid = true;
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);
        if (code > 255) {
            // Already correctly encoded somehow or has non-latin1 chars?
            // Actually, we should just extract the byte
            code = code & 0xFF;
        }
        bytes[i] = code;
    }
    
    // Now decode these raw bytes as UTF-8
    const properString = new TextDecoder('utf-8').decode(bytes);
    
    fs.writeFileSync('c:/dr.zahir/index.html', properString, 'utf8');
    console.log("Encoding fixed");
} catch(e) {
    console.error(e);
}
