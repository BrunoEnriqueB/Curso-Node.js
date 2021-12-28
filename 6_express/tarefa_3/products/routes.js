import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const basePath = path.join(__dirname, './templates');

const router = express.Router();

router.get('/carro', (req, res) => {
    res.sendFile(`${basePath}/carro.html`);
});

router.get('/moto', (req, res) => {
    res.sendFile(`${basePath}/moto.html`);
});

export { router };