const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = class ThoughtController {
    static async showAll(req, res) {
        res.render('thoughts/home');
    }

    static async dashboard(req, res) {
        const UserId = req.session.userid;
        const user = await User.findOne({
                where: {id: UserId},
                include: Thought,
                plain: true
            });
        const thoughts = user.Thoughts.map((result) => result.dataValues);
        
        res.render('thoughts/dashboard', { thoughts });
    }

    static createThought(req, res) {
        res.render('thoughts/add')
    }

    static async addThought(req, res) {
        const thought = {
            title: req.body.title,
            UserId: req.session.userid
        }
        
        await Thought.create(thought);

        try {
            req.flash('message', 'Pensamento criado com sucesso!');
            req.session.save(() => {
                res.redirect('/thoughts/dashboard');
            })
        } catch (err) {
            console.log(err);
        }
    }
}
