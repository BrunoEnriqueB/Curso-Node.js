import path from 'path';
//path absoluto
const customPath = "relatorio/bruno/relatorio.pdf";

console.log(path.dirname(customPath));
console.log(path.basename(customPath));
console.log(path.extname(customPath));