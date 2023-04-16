process.env.NODE_ENV = 'test';
process.env.MYSQL_USER = 'root';
process.env.MYSQL_PASSWORD = 'root';
process.env.MYSQL_ROOT_PASSWORD = 'root';
process.env.MYSQL_DATABASE = 'todos_test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
chai.should();
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('User', () => {
    beforeEach(async (done) => {
        done();
    });

    describe('POST /api/v1/register', () => {
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
    });

    describe('POST /api/v1/login', () => {
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
                    console.info(`Copy this token for unit other test: ${res.body.message.accessToken}`);
                    expect(res.body.success).to.equal(true);
                    done();
                });
        });
    });
});
