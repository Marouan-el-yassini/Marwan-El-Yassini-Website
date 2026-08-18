const fs = require('fs');

const files = [
    "mar.jpeg",
    "csharpintro.png",
    "scharpinter.png",
    "pyton%20intro.png",
    "html.png",
    "css.png",
    "introblazor.PNG",
    "firstapp.PNG",
    "todolist.PNG"
];

const baseUrl = "https://raw.githubusercontent.com/Marouan-el-yassini/Marwan-El-Yassini-Website/f10590f/";

async function downloadFiles() {
    for (const file of files) {
        try {
            console.log(`Downloading ${file}...`);
            const response = await fetch(baseUrl + file);
            if (!response.ok) throw new Error(`Status ${response.status}`);
            
            const buffer = await response.arrayBuffer();
            const outName = decodeURIComponent(file);
            fs.writeFileSync(outName, Buffer.from(buffer));
            console.log(`Saved ${outName}`);
        } catch (err) {
            console.error(`Error downloading ${file}:`, err.message);
        }
    }
    console.log("All done.");
}

downloadFiles();
