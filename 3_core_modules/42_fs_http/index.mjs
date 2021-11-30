import fs from 'fs';
import http from 'http';

const port = 3000;
const server = http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data) => { //le o html que queremos
        
        res.writeHead(200, {'Content-Type':'text/html'}); //definimos o status code e o tipo do arquivo a ser lido
        res.write(data) // escreve o conteúdo do arquivo
        return res.end() 
    });
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});