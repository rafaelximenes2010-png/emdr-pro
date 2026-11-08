// Copia o sistema (index.html, ícones e manifesto da raiz do repositório) para app/www,
// que é a pasta embutida nos apps iOS e Android.
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..", ".."), www = path.join(__dirname, "..", "www");
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www, { recursive: true });
for (const f of ["index.html", "manifest.webmanifest"]) fs.copyFileSync(path.join(root, f), path.join(www, f));
for (const d of ["icons", "fonts", "lib"]) fs.cpSync(path.join(root, d), path.join(www, d), { recursive: true });
console.log("Sistema copiado para app/www");
