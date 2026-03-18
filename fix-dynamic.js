const fs = require('fs');
const path = require('path');

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('page.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('fetch') && content.includes('Host') && !content.includes('force-dynamic')) {
                content += '\nexport const dynamic = "force-dynamic";\n';
                fs.writeFileSync(fullPath, content);
                console.log('Added force-dynamic to ' + fullPath);
            }
        }
    });
}
walk('app');
