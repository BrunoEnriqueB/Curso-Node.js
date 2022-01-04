import express from 'express';
import { User } from '../Models/User.js';
import { Address } from '../Models/Address.js';

const address_router = express.Router();

address_router.post('/create', async (req, res) => {
    const UserId = req.body.UserId;
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;

    await Address.create({street, number, city, UserId, where: {UserId: UserId}});

    res.redirect(`/users/edit/${UserId}`);
});

address_router.post('/delete', async (req, res) => {
    const id = req.body.id;
    const UserId = req.body.id;

    await Address.destroy({where: {id: id}});

    res.redirect(`/users/edit/${UserId}`);
});

export { address_router };