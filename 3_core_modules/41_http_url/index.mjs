import url from 'url';
import http from 'http';

const port = 3000;
const server = http.createServer((req, res) => {
    const urlInfo = url.parse(req.url, true); // decompoe a URL da requisição
    const name = urlInfo.query.name // Pegou a nossa url decomposta e adiciona uma váriavel para o meodo name

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    if (!name) {
        res.end('<h1> Preencha o seu nome: </h1> <form method="GET"><input type="text" name="name"/><input type="submit" value="Enviar"/></form>');
    } else {
        res.end(`<h1>Olá ${name}</h1>`);
    }
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})