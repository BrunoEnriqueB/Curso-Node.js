import express from 'express';
import { User } from '../Models/User.js';
import { Address } from '../Models/Address.js';

const user_router = express.Router();

user_router.post('/create', async (req, res) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create({name, occupation, newsletter});

    res.redirect('/')
});

user_router.get('/create', (req, res) => {
    res.render('adduser');
});

user_router.post('/update', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }
    
    const dataUser = {
        id, name, occupation, newsletter
    };

    await User.update(dataUser, {where: {id: id}});

    res.redirect('/');

});

user_router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({include: Address, where: {id: id}});

    let checked;
    if (user.newsletter === 1) {
        checked = true;
    } else {
        checked = false;
    }

    res.render('edituser', {user: user.get({plain: true}), checked});
});

user_router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;

    await User.destroy({where: {id: id}});

    res.redirect('/')
});

user_router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({raw: true, where: {id: id}});
    
    res.render('userview', {user});

});


export { user_router }; 