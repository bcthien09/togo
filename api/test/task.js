process.env.NODE_ENV = 'test';
process.env.MYSQL_USER = 'root';
process.env.MYSQL_PASSWORD = 'root';
process.env.MYSQL_ROOT_PASSWORD = 'root';
process.env.MYSQL_DATABASE = 'todos_test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const helper = require('../src/helpers');
let should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm1heFRvZG8iOjEsImlhdCI6MTY4MTQ4OTQzOSwiZXhwIjoxNjgxNDkzMDM5fQ.lO3qS27NhCN8GkeTa1yLezi1nCGw0mXPzbb2XWdoCHc'

describe('Task', () => {
    beforeEach(async (done) => {
        done();
    });

    describe('POST /api/v1/user/task', () => {
        it('should add task to user', (done) => {
            const task = {
                description: `Task testing ${helper.random()}`
            };

            chai.request(app)
                .post('/api/v1/user/task')
                .set('Accept','application/json')
                .set('Authorization',`Bearer ${accessToken}`)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('success').eql(true);
                    done();
                });
            
        });

        it('should a token expired', (done) => {
            const task = {
                description: `Task testing ${helper.random()}`
            };
            chai.request(app)
                .post('/api/v1/user/task')
                .set('Accept','application/json')
                .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJtYXhUb2RvIjozLCJpYXQiOjE2ODEzMTMxNDUsImV4cCI6MTY4MTMxNjc0NX0.hz8eTbyn5DliJMxj1lPqv7QU_QYaufa7n57xpRW1CGw')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql({"error":"Token is invalid"});
                    done();
                });
        });

        it('should add tasks over max_todo a day', async(done) => {
            const task = {
                description: `Task testing`,
            };
            
            chai.request(app)
                .post('/api/v1/user/task')
                .set('Accept','application/json')
                .set('Authorization',`Bearer ${accessToken}`)
                .send(task)
                .end((err, res) => {
                    res.body.should.have.property('message').eql({"error": `The user is limited by 1 tasks a day`});
                    done();
                });
        });
    });
});
