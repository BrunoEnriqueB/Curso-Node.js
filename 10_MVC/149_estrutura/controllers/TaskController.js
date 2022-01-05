import { Task } from "../models/Task.js";

export class TaskController {
    static createTask(req, res) {
        res.render('tasks/create');
    };

    static async showTasks(req, res) {
        const tasks = await Task.findAll({raw: true})
        res.render('tasks/all', {tasks});
    };

    static async addTask(req, res) {
        const title = req.body.title;
        const description = req.body.description;
        const done = false;
        const task = {
            title, description, done
        }

        await Task.create(task);

        res.redirect('/tasks');
    }

    static async removeTask(req, res) {
        const id = req.body.id;

        await Task.destroy({where: {id: id}});

        res.redirect('/tasks')
    }

    static async editTask(req, res) {
        const id = req.params.id;

        const task = await Task.findOne({raw: true, where: {id: id}});

        res.render('tasks/edit', {task});
    }

    static async updateTask(req, res) {
        const id = req.body.id;
        const update = {
            title: req.body.title,
            description: req.body.description
        };
        
        await Task.update(update, {where: {id: id}});
        
        res.redirect('/tasks');
    }

    static async doneTask(req, res) {
        const id = req.params.id;
        const done = await Task.findOne({where: {id: id}});
        const task = {
            done: done.done === false ? true : false,
        }

        await Task.update(task, {where: {id: id}});

        res.redirect('/tasks');
    }
}