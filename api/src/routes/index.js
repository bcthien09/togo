const express = require('express');
const { register, validJWT, addTask, login, verifyUser, getUserTasks, getTask } = require('../handlers');

const appRouter = express.Router();

appRouter.post('/register', [register]);
appRouter.post('/login', [verifyUser, login]);
appRouter.post('/user/task', [validJWT, addTask]);
appRouter.get('/user/tasks', [validJWT, getUserTasks]);
appRouter.get('/user/task/:taskId', [validJWT, getTask]);

module.exports = appRouter
