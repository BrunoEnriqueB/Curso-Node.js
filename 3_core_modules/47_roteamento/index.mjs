import http from 'http';
import url from 'url';
import fs, { readvSync } from 'fs';

const port = 3000;

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const filename = q.pathname.substring(1); //conseguimos pegar o nome do arquivo que está sendo usado

    if(filename.includes('html')) { //verifica se o arquivo tem HTML
        if(fs.existsSync(filename)) { //verifica se existe o arquivo
            fs.readFile(filename, (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            })
        } else {
            //404 - Página não existe
            fs.readFile('./404.html', (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data);
                return res.end();
            })
        }
    }
})

server.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
})