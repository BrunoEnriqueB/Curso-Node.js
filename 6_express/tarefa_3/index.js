import express from 'express';
import path from 'path';
import {router} from './products/routes.js'

const app = express();
const port = 5000;

const __dirname = path.resolve();
const basePath = path.join(__dirname, 'templates');

app.use(express.static('public'));

app.use('/products', router);

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
})

app.use(function(req, res, next) {
    res.sendFile(`${basePath}/404.html`);
})

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});