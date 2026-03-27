const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
console.log(`Found ${files.length} HTML files.`);

const replacements = [
    { from: /href="index\.html/g, to: 'href="/' },
    { from: /href="services\.html/g, to: 'href="services' },
    { from: /href="about\.html/g, to: 'href="about' },
    { from: /href="cabinet\.html/g, to: 'href="cabinet' },
    { from: /href="contact\.html/g, to: 'href="contact' },
    { from: /href="service-([\w-]+)\.html/g, to: 'href="service-$1' },
    { from: /src="dr\.zahir full logo\.png"/g, to: 'src="dr-zahir-logo-header.png"' },
    { from: /src="dr-zahir-full-logo\.png"/g, to: 'src="dr-zahir-logo-header.png"' },
];

files.forEach(file => {
    console.log(`Checking ${file}...`);
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    replacements.forEach(r => {
        content = content.replace(r.from, r.to);
    });

    // Special fix for canonicals and OG tags
    content = content.replace(/canonical" href="https:\/\/dr-zahir\.vercel\.app\/([\w-]+)\.html"/g, 'canonical" href="https://dr-zahir.vercel.app/$1"');
    content = content.replace(/property="og:url" content="https:\/\/dr-zahir\.vercel\.app\/([\w-]+)\.html"/g, 'property="og:url" content="https://dr-zahir.vercel.app/$1"');
    content = content.replace(/property="twitter:url" content="https:\/\/dr-zahir\.vercel\.app\/([\w-]+)\.html"/g, 'property="twitter:url" content="https://dr-zahir.vercel.app/$1"');

    if (file === 'about.html' && !content.includes('<head>')) {
        console.log('Fixing about.html head...');
        const headStart = `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>À Propos du Dr. Zahir — Centre Dentaire Zahir Casablanca</title>
    <meta name="description" content="Découvrez le parcours du Dr. Mohamed Amine Zahir, chirurgien-dentiste à Casablanca. Expertise en implantologie et dentisterie esthétique.">
    <link rel="canonical" href="https://dr-zahir.vercel.app/about">
    <link rel="icon" type="image/jpeg" href="dr-zahir-icon.jpg">
    <link rel="shortcut icon" href="dr-zahir-icon.jpg">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://dr-zahir.vercel.app/about">
    <meta property="og:title" content="À Propos du Dr. Zahir — Centre Dentaire Zahir Casablanca">
    <meta property="og:description" content="Découvrez l'expertise du Dr. Mohamed Amine Zahir.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Jost:wght@300..700&display=swap" rel="stylesheet">
`;
        const styleIndex = content.indexOf('<style>');
        if (styleIndex !== -1) {
             const after = content.substring(styleIndex);
             content = `<!DOCTYPE html>\n<html lang="fr">\n${headStart}${after}`;
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
