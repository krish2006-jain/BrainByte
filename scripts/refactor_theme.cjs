const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/bharat-ai-portal-f28/client/pages';
const filesToProcess = [
    'VidyarthiAINew.tsx',
    'StudyPartner.tsx',
    'ErrorScanner.tsx',
    'StepByStepGuides.tsx',
    'SevaSummaryNew.tsx'
];

// First, safely replace dark backgrounds and borders
const replacements1 = [
    { search: /bg-slate-900/g, replace: 'bg-white' },
    { search: /bg-slate-800/g, replace: 'bg-slate-50' },
    { search: /bg-slate-700/g, replace: 'bg-white' },
    { search: /border-slate-700/g, replace: 'border-slate-200' },
    { search: /border-slate-600/g, replace: 'border-slate-300' },
    { search: /text-slate-400/g, replace: 'text-slate-500' },
    { search: /text-slate-300/g, replace: 'text-slate-600' },
    { search: /text-slate-100/g, replace: 'text-slate-800' },
    { search: /placeholder-slate-500/g, replace: 'placeholder-slate-400' },
    { search: /hover:bg-slate-600/g, replace: 'hover:bg-slate-100' },
    { search: /text-white/g, replace: 'text-slate-800' }, // Change all white text to dark
];

// Then fix the buttons that should have stayed white
const replacements2 = [
    { search: /bg-blue-600 text-slate-800/g, replace: 'bg-blue-600 text-white' },
    { search: /bg-blue-500 text-slate-800/g, replace: 'bg-blue-500 text-white' },
    { search: /bg-green-500 text-slate-800/g, replace: 'bg-green-500 text-white' },
    { search: /bg-green-600 text-slate-800/g, replace: 'bg-green-600 text-white' },
    { search: /bg-indigo-600 text-slate-800/g, replace: 'bg-indigo-600 text-white' },
    { search: /bg-purple-600 text-slate-800/g, replace: 'bg-purple-600 text-white' },
    { search: /bg-orange-600 text-slate-800/g, replace: 'bg-orange-600 text-white' },
    { search: /text-slate-800 px-6 py-2 rounded-lg/g, replace: 'text-white px-6 py-2 rounded-lg' },
    { search: /text-slate-800 rounded-lg p-4 hover:/g, replace: 'text-white rounded-lg p-4 hover:' },
];

filesToProcess.forEach(file => {
    const filePath = path.join(pagesDir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    replacements1.forEach(({ search, replace }) => {
        content = content.replace(search, replace);
    });

    replacements2.forEach(({ search, replace }) => {
        content = content.replace(search, replace);
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`No changes made to ${file}`);
    }
});
