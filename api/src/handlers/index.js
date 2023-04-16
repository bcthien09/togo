const { Sequelize } = require('sequelize');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');
const User = require('../models/user');
const {hashPassword, verifyPassword} = require('../utils');
const accessSecretKey = 'access-key-key';

const register = async (req, res) => {
    try {
        const username = req.body.username;
        if (!username) {
            return res.json({
                success: false,
                message: `username is required`
            });
        }
        const hasUser = await User.findOne({where: {username: username}, raw: true});
        if (hasUser) {
            return res.json({
                success: false,
                message: `The ${username} is taken`
            });
        }
        if (!req.body.password) {
            return res.json({
                success: false,
                message: `password is required`
            });
        }
        req.body.password = await hashPassword(req.body.password);
        const user = await User.create(req.body);

        if (!user) {
            console.warn(
                `At register(): Can not create a user: ${JSON.stringify(
                    req.body,
                )}`,
            );

            return res.json({
                success: false,
                message: 'Can not create a user'
            });
        }

        return res.json({
            success: true,
            message: { user },
        });

    } catch (error) {
        if (error instanceof Error) {
            console.error(
                `At register(): Error to create a user: ${error?.message}`,
            );
        } else {
            console.error(
                `At in register(): Unexpected an error: ${error}`,
            );
        }
    }
}

const verifyUser = async (req, res, next,) => {
    try {
        let { username, password } = req.body;
        if (!username) {
            return res.json({
                success: false,
                message: `username is required`
            });
        }
        if (!password) {
            return res.json({
                success: false,
                message: `password is required`
            });
        }

        username = username && username.trim();
        password = password && password.trim();
        const user = await User.findOne({where: {username: username}, raw: true});
        if (!user) {
            console.warn(
                `At verifyUser(): The ${username} hasn't matched`,
            );

            return res.json({
                success: false,
                message: `Not found username ${username}`
            });
        }

        const passwordOfUser = user?.password;
        const isVerifiedPassword = await verifyPassword (
            password,
            passwordOfUser,
        );
        if (!isVerifiedPassword) {
            console.warn(
                `At verifyUser(): The ${password} hasn't matched`,
            );

            return res.json({
                success: false,
                message: `The ${password} hasn't matched`
            });
        }

        req.body = {
            userId: user.id,
            max_todo: user.max_todo
        };

        return next();
    } catch (error) {
        if (error instanceof Error) {
            console.error(
                `At verifyUser(): Error to verify user: ${error?.message}`,
            );
        } else {
            console.error(
                `At verifyUser(): Unexpected an error: ${error}`,
            );
        }
    }
}

const login = async (req, res) => {
    try {
        const userId = req.body.userId;
        const maxTodo = req.body.max_todo;

        if (!userId) {
            console.error(
                `At login(): Not found userId in the request`,
            );

            return res.json({
                success: false,
                message: `Not found userId in request`
            });
        }

        const refreshId = `${userId}${accessSecretKey}`;
        const salt = crypto.createSecretKey(crypto.randomBytes(16));
        const hash = crypto
            .createHmac('sha512', salt)
            .update(refreshId)
            .digest('base64');

        const token = jwt.sign(
            {
                userId,
                maxTodo,
                iat: Math.floor(Date.now() / 1000),
            },
            accessSecretKey,
            {
                expiresIn: '1h',
            },
        );

        if (!token) {
            console.warn(`At loign(): Token is empty`);
            return res.json({
                success: false,
                message: `Not found userId in request`
            });
        }

        console.info(
            `At login(): Done to generate token`,
        );

        return res.json({
            success: true,
            message: {
                accessToken: token,
                refreshToken: hash,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(
                `At login(): Error to generate token: ${error?.message}`,
            );
        } else {
            console.error(
                `At login(): Unexpected an error: ${error}`,
            );
        }
    }
}

const addTask = async (req, res) => {
    try {
        const description = req.body.description;
        if (!description) {
            return res.json({
                success: false,
                message: 'description is required'
            });
        }

        const userId = res.locals.jwt.userId;
        const maxToDo = res.locals.jwt.maxTodo;

        // Query data in day
        const start = new Date();
        start.setUTCHours(0,0,0,0);
        const end = new Date();
        end.setUTCHours(23,59,59,999);
        const taskCount = await Task.count({
            where: {
                user_id: userId,
                created_at: {
                    [Sequelize.Op.between]: [start.toISOString(), end.toISOString()],
                }
            }, raw: true
        }) ?? 0;

        if (taskCount >= maxToDo) {
            console.log(`At addTask(): Can not add a task for user`);
            return res.json({
                success: false,
                message: `The user is limited by ${maxToDo} tasks a day`
            });
        }

        const task = {
            user_id: userId,
            description
        }
        
        const result = await Task.create(task);
        return res.json({
            success: true,
            message: {
                task: result
            }
        });

    } catch (err) {
        console.log(err);
    }
}

const getUserTasks = async (req, res) => {
    const userId = req.body.userId;
    if (!userId) return res.json({
        success: false,
        message: {
            error: 'Not found userId in request'
        }
    })
    const tasks = await Task.findAll({where: {user_id: userId}, raw: true});
    return res.json({
        success: true,
        message: {
            tasks
        }
    })
}

const getTask = async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) return res.json({
        success: false,
        message: {
            error: 'Not found userId in request'
        }
    })
    const task = await Task.findByPk(taskId);
    return res.json({
        success: true,
        message: {
            task
        }
    })
}

const validJWT = (req, res, next) => {
    if (!req.headers.authorization) {
        console.warn(
            `At validJWT(): The token hasn't found in request headers`,
        );

        return res.json({
            success: false,
            message: `The token hasn't found in request headers`
        });
    }

    try {
        const authorization = req.headers.authorization.split(' ');
        if (authorization && authorization[0] !== 'Bearer') {
            console.warn(
                `At validJWT(): The Bearer isn't found in the token`,
            );

            return res.json({
                success: false,
                message: 'Bearer is not in header',
            });
        }

        res.locals.jwt = jwt.verify(
            authorization[1],
            accessSecretKey,
        );

        return next();
    } catch (error) {
        if (error instanceof Error) {
            console.error(
                `At validJWT(): Validation JWT has an error: ${error.message}`,
            );
        } else {
            console.error(
                `At validJWT(): Unexpected an error: ${error}`,
            );
        }

        return res.json({
            success: false,
            message: error.message ?? 'Token is invalid',
        });
    }
}

module.exports = {
    validJWT,
    register,
    verifyUser,
    login,
    addTask,
    getUserTasks,
    getTask
}

