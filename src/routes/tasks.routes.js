const express = require('express')
const TaskController = require('../controller/task');
const Middlewares = require('../middlewares/index');
const taskRouter = express.Router();

taskRouter.post('/createTask', Middlewares.verifyToken, TaskController.create);
taskRouter.patch('/updateTask/:taskId', Middlewares.verifyToken, TaskController.update);
taskRouter.delete('/deleteTask/:taskId', Middlewares.verifyToken, TaskController.delete);
taskRouter.get('/readTask/:userId', Middlewares.verifyToken, TaskController.findTasks);

module.exports = taskRouter;