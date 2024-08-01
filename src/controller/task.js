const Utils = require('../../utils');
const TaskModel = require('../model/task');
const Response = require('../lib/response');

// Create and Save a new task
exports.create = async (req, res) => {

    let response = new Response();

    if (!req.body.userId && !req.body.heading) {
        response.setStatusCode(400);
        response.setStatus('failed');
        response.setInfo({ message: "Content can not be empty!" });
        res.send(response);
    }
    
    const task = new TaskModel({
        taskId: Utils.generateRandomString(),
        userId: req.body.userId,
        heading: req.body.heading,
        details: req.body.lastName,
        tag: req.body.tag,
        created: new Date()
    });
    
    await task.save().then(data => {
        response.setStatusCode(200);
        response.setStatus('success');
        response.setInfo({
            message:"Task created successfully!!",
            task:data
        });
        res.send(response);
    }).catch(err => {
        response.setStatusCode(500);
        response.setStatus('failed');
        response.setInfo({ message: err.message || "Some error occurred while creating task" });
        res.send(response);
    });
};

// Update a task by the taskId
exports.update = async (req, res) => {

    let response = new Response();

    if (!req.body) {
        response.setStatusCode(400);
        response.setStatus('failed');
        response.setInfo({ message: "Data to update cannot be empty!" });
        res.send(response);
    }

    const taskId = req.params?.taskId || '';

    try {
        const task = await TaskModel.findOneAndUpdate(
            { taskId: taskId },    
            req.body,              
            { new: true, useFindAndModify: false } 
        );

        if (!task) {
            response.setStatusCode(400);
            response.setStatus('failed');
            response.setInfo({ message: `Task with taskId ${taskId} not found.` });
        } else {
            response.setStatusCode(200);
            response.setStatus('success');
            response.setInfo({ message: "Task updated successfully.", task });
        }
        res.send(response);
    } catch (err) {
        response.setStatusCode(400);
        response.setStatus('failed');
        response.setInfo({ message: err.message });
        res.send(response);
    }
};

// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
    const taskId = req.params.taskId;
    let response = new Response();

    try {
        // Use findOneAndDelete to delete based on taskId
        const data = await TaskModel.findOneAndDelete({ taskId: taskId });

        if (!data) {
            response.setStatusCode(400);
            response.setStatus('failed');
            response.setInfo({ message: `Task with taskId ${taskId} not found.` });
        } else {
            response.setStatusCode(200);
            response.setStatus('success');
            response.setInfo({ message: "Task deleted successfully!" }); 
        }
        res.send(response);
    } catch (err) {
        response.setStatusCode(400);
        response.setStatus('failed');
        response.setInfo({ message: err.message });
        res.send(response);
    }
};

// Retrieve all tasks of an taskOwner
exports.findTasks = async (req, res) => {
    const userId = req.params.userId;
    let response = new Response();

    try {
        // Query to find tasks by taskOwner
        const tasks = await TaskModel.find({ userId: userId });

        if (tasks.length === 0) {
            response.setStatusCode(400);
            response.setStatus('failed');
            response.setInfo({ message: `No tasks found for taskOwner ${userId}.` });
        } else {
            response.setStatusCode(200);
            response.setStatus('success');
            response.setInfo({ message: "Tasks found", tasks });
        }
        res.send(response);
    } catch (err) {
        response.setStatusCode(400);
        response.setStatus('failed');
        response.setInfo({ message: err.message });
        res.send(response);
    }
};

