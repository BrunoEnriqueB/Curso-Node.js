import { Task } from "../models/Task.js";
import express from 'express';
import { TaskController } from "../controllers/TaskController.js";

const router = express.Router();

router.get('/', TaskController.showTasks);
router.get('/add', TaskController.createTask);
router.get('/edit/:id', TaskController.editTask);
router.post('/add', TaskController.addTask);
router.post('/remove', TaskController.removeTask);
router.post('/edit', TaskController.updateTask);
router.post('/done/:id', TaskController.doneTask);


export { router };