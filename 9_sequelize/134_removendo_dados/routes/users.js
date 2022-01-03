import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

router.get('/create',  (req, res) => {
    res.render('adduser');
})

router.post('/create', async (req, res) => { //determinado a função como assincrona
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create({name, occupation, newsletter}); //passando a criação de uma nova row no banco de dados com esses dados
    //A gente coloca await pra esperar a criação do usuário para poder redirecionar a página
    res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;

    await User.destroy({where: {id: id}});

    res.redirect('/')
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({raw: true, where:  { id:id }});

    res.render('userview', { user });
});


export {router};