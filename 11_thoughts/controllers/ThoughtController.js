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

        let emptyThoughts = false;
        if (thoughts.length === 0) {
            emptyThoughts = true;
        }
        
        res.render('thoughts/dashboard', { thoughts, emptyThoughts });
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

    static async remove(req, res) {
        const id = req.body.id;
        const userid = req.session.userid;

        try {
            await Thought.destroy({where: {id: id, UserId: userid}});
            req.flash('message', 'Pensamento removido com sucesso!');

            req.session.save(() => {
                res.redirect('/thoughts/dashboard');
            })
        } catch (error) {
            console.log(error)
        }        
    }

    static async edit(req, res) {
        const UserId = req.session.userid;
        const id = req.params.id;
        const thought = await Thought.findOne({raw: true, where: {id: id, UserId: UserId}});
        
        try {
            req.session.save(() => {
            res.render('thoughts/edit', { thought })
        });
        } catch (error) {
            console.log(error)
        }
    }

    static async editPost(req, res) {
        const id = req.body.id;
        const thought = {
            title: req.body.title
        }
        const UserId = req.session.userid;

        console.log(thought);

        try {
            await Thought.update(thought, {where: {id: id, UserId: UserId}});
            req.flash('message', 'Pensamento editado com sucesso!')

            req.session.save(() => {
            res.redirect('/thoughts/dashboard');
        })
        } catch (error) {
            console.log(error)
        }
    }
}
