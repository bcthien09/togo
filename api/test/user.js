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

describe('User', () => {
    beforeEach(async (done) => {
        done();
    });

    describe('POST /api/v1/register', () => {
        it('should create a user', (done) => {
            let user = {
                username: `manabie-test`,
                password: '123456',
                max_todo: 1
            };
            chai.request(app)
                .post('/api/v1/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });

        it('should not create a user with no pass', (done) => {
            let user = {
                username: 'manabie-test',
                max_todo: 1
            };
            chai.request(app)
                .post('/api/v1/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    done();
                });
        });
    });

    describe('POST /api/v1/login', () => {
        it('should a user login', (done) => {
            let user = {
                username: `manabie-test`,
                password: '123456'
            };
            chai.request(app)
                .post('/api/v1/login')
                .send(user)
                .end((err, res) => {
                    console.log('Token =====> ', res.body.message.accessToken);
                    res.should.have.status(200);
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('message');                    
                    res.body.message.should.have.property('accessToken');
                    done();
                });
        });

        it('should not username login', (done) => {
            let user = {
                username: `manabie-test1`,
                password: '123456'
            };
            chai.request(app)
                .post('/api/v1/login')
                .send(user)
                .end((err, res) => {
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('Not found username manabie-test1');
                    done();
                });
        });
    });
});
