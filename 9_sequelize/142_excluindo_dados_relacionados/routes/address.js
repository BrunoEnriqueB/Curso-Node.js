import express from 'express';
import { User } from '../models/User.js'
import { Address } from '../models/Address.js';

const address_router = express.Router();

address_router.post('/create', async (req, res) => {
    const UserId = req.body.UserId;
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;
    
    const dataAddress = {
        UserId, street, number, city
    }

   await Address.create(dataAddress)

   res.redirect(`/users/edit/${UserId}`);
});

address_router.post('/delete', async (req, res) => {
    const UserId = req.body.UserId;
    const id = req.body.id;

    await Address.destroy({
        where: {id: id}
    });

    res.redirect(`/users/edit/${UserId}`);
});

export { address_router };