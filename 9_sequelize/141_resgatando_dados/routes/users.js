import express from 'express';
import { User } from '../models/User.js';
import { Address } from '../models/Address.js';

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('adduser');
});

router.post('/update', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if(newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    const dataUser = {
        id, name, occupation, newsletter
    }

    await User.update(dataUser, {where: {id: id}});

    res.redirect('/');

});

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;


    const user = await User.findOne({include: Address, where: {id: id}}); //include faz a relação com endereço e traz só os endereços do usuário
    let checked;
    if (user.newsletter === 1) {
        checked = true;
    } else {
        checked = false;
    }

    res.render('edituser', { user: user.get({plain: true}), checked }); // user.get({ plain: true}) transforma o objeto de uma forma que o handlebars consiga ler  
});

router.post('/create', async (req, res) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create({name, occupation, newsletter});

    res.redirect('/');
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const user = await User.findOne({raw: true, where: {id: id}});

    res.render('userview', {user});
});

router.post('/delete/:id', async(req, res) => {
    const id = req.params.id;

    await User.destroy({where: {id: id}});

    res.redirect('/');
});

export {router};