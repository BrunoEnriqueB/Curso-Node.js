import fs, { mkdirSync } from 'fs';

if (!fs.existsSync('./minhapasta')) {
    fs.mkdirSync('./minhapasta');
    console.log("Pasta criada com sucesso!");
} else {
    console.log("Pasta já existe!");
}