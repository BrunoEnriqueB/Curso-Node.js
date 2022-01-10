const User = require('../models/User.js');
const bcrypt = require('bcryptjs'); // módulo de criptografação de senha do usuário

module.exports = class AuthController {

    static login(req, res) {
        res.render('auth/login');
    }

    static async loginPost(req, res) {
        const { email, password } = req.body;


        //find user
        const user = await User.findOne({where: {email: email}});
        // verify if user exists
        if(!user) {
            req.flash('message', 'Usuário não encontrado!');
            res.render('auth/login')
            return;
        }

        //check if passwords match
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if(!passwordMatch) {
            req.flash('message', 'Senha inválida!');
            res.render('auth/login')
            return;
        }

        // initializate session
        req.session.userid = user.id;
        req.flash('message', 'Usuário logado com sucesso!');
        req.session.save(() => {
            res.redirect('/'); 
        });
        
    }

    static register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res) {
         const { name, email, password, confirmpassword } = req.body;
         
         // password match validation
         if (password != confirmpassword) {
             // flash message
             req.flash('message', 'As senhas não conferem! Tente novamente'); //isso aqui é como se estivessemos mandando pro front um dado com res.render
             res.render('auth/register');
             return;
         }

         // check if user already exists
         const checkIfUserExists = await User.findOne({where: {email: email}});

         if (checkIfUserExists) {
            req.flash('message', 'Já existe um usuário com esse email!'); //isso aqui é como se estivessemos mandando pro front um dado com res.render
            res.render('auth/register');
            return;
         }

         //create a hash password
         const salt = bcrypt.genSaltSync(10);
         const hashedPassword = bcrypt.hashSync(password, salt); //mistura o salt com a senha pra dificultar ainda mais a descriptogração

         const user = {
             name, email,
             password: hashedPassword
         }

        const createdUser = await User.create(user);
        //initializate session
        req.session.userid = createdUser.id;


        try {
            req.flash('message', 'Usuário criado com sucesso!');
            req.session.save(() => {
                res.redirect('/'); 
            });
        } catch (err) {
            console.log(err);
        }
        
    }

    static logout(req, res) {
        req.session.destroy(); //remove a seção do usuário
        res.redirect('/login');
    }
}