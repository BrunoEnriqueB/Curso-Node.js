const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = class ThoughtController {
    static async showAll(req, res) {
        res.render('thoughts/home');
    }
}