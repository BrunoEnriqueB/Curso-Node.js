const express = require('express');
const router = express.Router();
const ThoughtController = require('../controllers/ThoughtController');
const checkAuth = require('../helpers/auth.js').checkAuth;

//controller
router.get('/add', checkAuth, ThoughtController.createThought);
router.post('/add', ThoughtController.addThought)

router.get('/dashboard', checkAuth, ThoughtController.dashboard); //checkauth entra como middleware e vai ser sempre executado quando a rota for acessada
router.get('/', ThoughtController.showAll);

router.post('/remove', checkAuth, ThoughtController.remove);

module.exports = router;