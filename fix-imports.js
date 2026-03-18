const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Check if CardDescription is used but not imported
    if (content.includes('<CardDescription') && !content.match(/import\s*\{[^}]*CardDescription[^}]*\}\s*from\s*["']@\/components\/ui\/card["']/)) {
        content = content.replace(/CardTitle,?(\s*)\} from ["']@\/components\/ui\/card["']/g, 'CardTitle, CardDescription$1} from "@/components/ui/card"');
        changed = true;
    }
    
    // Check if ChartContainer is used but not imported
    if (content.includes('<ChartContainer') && !content.match(/import\s*\{[^}]*ChartContainer[^}]*\}\s*from\s*["']@\/components\/ui\/chart["']/)) {
        content = content.replace(/(import\s*\{[^}]*\}\s*from\s*["']recharts["'])/, 
            '$1\nimport { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"');
        changed = true;
    }

    if (content.includes('React.') && !content.match(/import\s+React\s+from/)) {
        content = 'import React from "react";\n' + content;
        changed = true;
    }

    if (content.includes('<TrendingUp') && !content.match(/import\s+\{[^}]*TrendingUp[^}]*\}\s+from/)) {
        content = 'import { TrendingUp } from "lucide-react";\n' + content;
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log('Fixed imports in ' + filePath);
    }
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    });
}

walk('components/layouts/zakat/dashboard');
walk('components/layouts/kurban/dashboard');
