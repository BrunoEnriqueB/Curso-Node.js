import fs from 'fs';

console.log("inicio")
fs.writeFileSync('arquivo.txt', 'oi');
console.log("fim")