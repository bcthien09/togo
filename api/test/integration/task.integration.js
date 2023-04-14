process.env.NODE_ENV = 'test';
process.env.MYSQL_USER = 'root';
process.env.MYSQL_PASSWORD = 'root';
process.env.MYSQL_ROOT_PASSWORD = 'root';
process.env.MYSQL_DATABASE = 'todos_test';

const chai = require('chai');
const axios = require('axios');
const jwt_decode = require('jwt-decode');

const chaiHttp = require('chai-http');

chai.should();
const expect = require('chai').expect;

chai.use(chaiHttp);

async function createUser() {
    let user = {
        username: `manabie-integrate-test`,
        password: '123456',
        max_todo: 3
    };

    const result = await axios.post('http://localhost:8080/api/v1/register', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return result;
}

async function userLogin() {
    let user = {
        username: `manabie-integrate-test`,
        password: '123456',
    };

	const result = await axios.post('http://localhost:8080/api/v1/login', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return result;
}


describe('POST /api/v1/user/task', () => {
    beforeEach(async (done) => {
        await createUser();
        done();
    });

    it('respond no token in request', async () => {
        await userLogin();
        const response = await axios.post('http://localhost:8080/api/v1/user/task', {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        expect(response.data.message.error).to.equal("The token hasn't found in request headers");
    });

    it('respond description is required', async () => {
        const user = await userLogin();
        const response = await axios.post('http://localhost:8080/api/v1/user/task', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.data.message.accessToken}`
            }
        });

        expect(response.data.message.error).to.equal("description is required");
    });

    it('respond user create tasks successfully', async () => {
        const result = await userLogin();
        const response = await axios.post('http://localhost:8080/api/v1/user/task', {description: 'Task 1'}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${result.data.message.accessToken}`
            }
        });

        expect(response.data.success.task.description).to.equal("Task 1");
    });

    it('respond user create tasks over limitation', async () => {
        const result = await userLogin();
        const {maxTodo} = jwt_decode(result.data.message.accessToken);
        
        for(let i = 0; i < 3; i++) {
            const response = await axios.post('http://localhost:8080/api/v1/user/task', {description: `Task ${i + 1}`}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${result.data.message.accessToken}`
                }
            });

            if (response.data.message.error === `The user is limited by ${maxTodo} tasks a day`) {
                expect(response.data.message.error).to.equal(`The user is limited by ${maxTodo} tasks a day`);
            }
        }
    });
});
