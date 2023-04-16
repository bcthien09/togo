process.env.NODE_ENV = 'test';
process.env.MYSQL_USER = 'root';
process.env.MYSQL_PASSWORD = 'root';
process.env.MYSQL_ROOT_PASSWORD = 'root';
process.env.MYSQL_DATABASE = 'todos_test';

const chai = require('chai');
const jwt_decode = require('jwt-decode');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const helper = require('../src/helpers');
chai.should();
chai.use(chaiHttp);
const expect = require('chai').expect;

// Note: the token will be expired after 1h
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm1heFRvZG8iOjMsImlhdCI6MTY4MTYzNjE5OSwiZXhwIjoxNjgxNjM5Nzk5fQ.7xrMRY1zOqHgq0dnCQYsSxb2-pxYfNmeYiVlztrf8Mc'

describe('Task', () => {
    beforeEach(async (done) => {
        done();
    });

    describe('POST /api/v1/user/task', () => {
        it('should create a task with no token in header', async (done) => {
            const task = {};
    
            chai.request(app)
                .post('/api/v1/user/task')
                .set('Accept','application/json')
                .send(task)
                .end((err, res) => {
                    expect(res.body.message).to.equal(`The token hasn't found in request headers`);
                    done();
                });
        });

        it('should create a task with jwt malformed', async (done) => {
            const task = {};
    
            chai.request(app)
                .post('/api/v1/user/task')
                .set('Accept','application/json')
                .set('Authorization',`Bearer token-invalid`)
                .send(task)
                .end((err, res) => {
                    expect(res.body.message).to.eql(`jwt malformed`);
                    done();
                });
        });

        it('should create a task and authorization no Bearer in header', async (done) => {
            const task = {
                description: `Task testing ${helper.random()}`
            };
    
            chai.request(app)
                .post('/api/v1/user/task')
                .set('Accept','application/json')
                .set('Authorization',`Bearerewew token-invalid`)
                .send(task)
                .end((err, res) => {
                    expect(res.body.message).to.equal(`Bearer is not in header`);
                    done();
                });
        });
    
        it('should create a task with token is expired', async (done) => {
            const task = {};
    
            chai.request(app)
                .post('/api/v1/user/task')
                .set('Accept','application/json')
                .set('Authorization',`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJtYXhUb2RvIjozLCJpYXQiOjE2ODEzMTMxNDUsImV4cCI6MTY4MTMxNjc0NX0.hz8eTbyn5DliJMxj1lPqv7QU_QYaufa7n57xpRW1CGw`)
                .send(task)
                .end((err, res) => {
                    expect(res.body.message).to.equal('jwt expired');
                    done();
                });
        });
    
        it('should create a task required description in body', async (done) => {
            const task = {};
            chai.request(app)
                .post('/api/v1/user/task')
                .set('Accept','application/json')
                .set('Authorization',`Bearer ${accessToken}`)
                .send(task)
                .end((err, res) => {
                    expect(res.body.message).to.equal('description is required');
                    done();
                });
        });
    
        it('should create a task successfull', async (done) => {
            const task = {
                description: `Task testing ${helper.random()}`
            };
            chai.request(app)
                .post('/api/v1/user/task')
                .set('Accept','application/json')
                .set('Authorization',`Bearer ${accessToken}`)
                .send(task)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true);
                    done();
                });
        });

        const tasks = [
            {
                description: `Task testing ${helper.random()}`
            },
            {
                description: `Task testing ${helper.random()}`
            },
            {
                description: `Task testing ${helper.random()}`
            }
        ];
    
        tasks.forEach(task => {
            it('should create tasks that is over limit daily task', async (done) => {
                const {maxTodo} = jwt_decode(accessToken);
                chai.request(app)
                    .post('/api/v1/user/task')
                    .set('Accept','application/json')
                    .set('Authorization',`Bearer ${accessToken}`)
                    .send(task)
                    .end((err, res) => {
                        if (!res.body.success)
                            expect(res.body.message).to.equal(`The user is limited by ${maxTodo} tasks a day`);
                        
                        done();
                    });
            });
        })
    });
});
