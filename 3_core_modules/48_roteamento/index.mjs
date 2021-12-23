import http from 'http';
import fs from 'fs';
import url from 'url';

const port = 3000;

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const fileName = q.pathname.substring(1);

    if (fileName.includes('html')) {
        if (fs.existsSync(fileName)) {
            fs.readFile(fileName, (err, data) => {
                res.writeHead(200, {'Content-type' : 'text/html'});
                res.write(data);
                return res.end();
            });
        } else {
            // Se não existir o arquivo: 404
            fs.readFile('404.html', (err, data) => {
                res.writeHead(404, {'Content-type' : 'text/html'});
                res.write(data);
                return res.end();
            });
        }
    }
})

server.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})