import path from 'path';

//path absoluto
console.log(path.resolve('teste.txt'));

const midFolder = "relatorios";
const fileName = "bruno.txt";

const finalPath = path.join('/', 'arquivos', midFolder, fileName);
console.log(finalPath);