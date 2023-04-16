process.env.MYSQL_USER = 'root';
process.env.MYSQL_PASSWORD = 'root';
process.env.MYSQL_ROOT_PASSWORD = 'root';
process.env.MYSQL_DATABASE = 'todos_test';

const chai = require('chai');
const jwt_decode = require('jwt-decode');
const app = require('../../src/app');
const helper = require('../../src/helpers');

const chaiHttp = require('chai-http');

chai.should();
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('POST Integration testing /api/v1/user/task', () => {
    beforeEach(async (done) => {
        done();
    });

    it('should create a user without username', (done) => {
        let user = {
            password: '123456',
            max_todo: 3
        };
        chai.request(app)
            .post('/api/v1/register')
            .send(user)
            .end((err, res) => {
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql('username is required');
                done();
            });
    });

    it('should create a user without password', (done) => {
        let user = {
            username: 'manabie-test',
            max_todo: 3
        };
        chai.request(app)
            .post('/api/v1/register')
            .send(user)
            .end((err, res) => {
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql('password is required');
                done();
            });
    });

    it('should create a user successfull', (done) => {
        let user = {
            username: 'manabie-test',
            password: '123456',
            max_todo: 3
        };
        chai.request(app)
            .post('/api/v1/register')
            .send(user)
            .end((err, res) => {
                expect(res.body.success).to.equal(true)
                done();
            });
    });

    it('should create user with duplication username', (done) => {
        let user = {
            username: 'manabie-test',
            password: '123456',
            max_todo: 3
        };
        chai.request(app)
            .post('/api/v1/register')
            .send(user)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal(`The ${user.username} is taken`);
                done();
            });
    });

    it('should login user with no username', (done) => {
        let user = {
            password: '123456',
            max_todo: 3
        };
        chai.request(app)
            .post('/api/v1/login')
            .send(user)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('username is required');
                done();
            });
    });

    it('should login user with no password', (done) => {
        let user = {
            username: 'manabie-test',
            max_todo: 3
        };
        chai.request(app)
            .post('/api/v1/login')
            .send(user)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('password is required');
                done();
            });
    });

    it('should login user successfull', (done) => {
        let user = {
            username: 'manabie-test',
            password: '123456',
            max_todo: 3
        };
        chai.request(app)
            .post('/api/v1/login')
            .send(user)
            .end((err, res) => {
                process.env.ACEESS_TOKEN = res.body.message.accessToken;
                expect(res.body.success).to.equal(true);
                done();
            });
    });

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
            .set('Authorization',`Bearer ${process.env.ACEESS_TOKEN}`)
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
            .set('Authorization',`Bearer ${process.env.ACEESS_TOKEN}`)
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
            const token = process.env.ACEESS_TOKEN;
            const {maxTodo} = jwt_decode(token);
            chai.request(app)
                .post('/api/v1/user/task')
                .set('Accept','application/json')
                .set('Authorization',`Bearer ${token}`)
                .send(task)
                .end((err, res) => {
                    if (!res.body.success)
                        expect(res.body.message).to.equal(`The user is limited by ${maxTodo} tasks a day`);
                    
                    done();
                });
        });
    })
});
