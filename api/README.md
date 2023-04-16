**How to run the project on local**
- Install docker 
`For Ubuntu https://docs.docker.com/engine/install/ubuntu/`
`For MacOS https://docs.docker.com/desktop/install/mac-install/`
`For Windows https://docs.docker.com/desktop/install/windows-install/`
- Open file .env and change it if you don't want to use default
- Start docker by Docker Desktop
- Run `chmod +x run.sh`
- Start project by command `./run.sh local`. Wait 1-2 minutes for build project
- To stop docker, using `ctrl + c` and `./run stop`

**APIs**

Open file `user.http` and run a api which you want to check

**cURL**

If don't run APIs with `user.http`, we can run with cURL

`curl -X POST -H "Content-Type: application/json" \
    -d '{"username": "test1", "password": "123456"}' \
    http://localhost:8080/api/v1/register`

`curl -X POST -H "Content-Type: application/json" \
    -d '{"username": "test1", "password": "123456"}' \
    http://localhost:8080/api/v1/login`

`curl -X POST -H "Authorization: Bearer token-here" \
    -d '{"description": "Task 1"}' \
    http://localhost:8080/api/v1/user/task`


**How to run UnitTest**

- Access to folder `api` and run `yarn install` before run test
- run test with command `yarn test` or `npm test`
- If have mysql error, please check config local database again in above file `test/user.js` and `test/task.js`

**Run Integration Test**

`npm test -- test/integration/task.integration.js`
Not finish yet. it needs to improve more. 

**What do you love about your solution**

- Structure the project to many component as model, config, db, route...it will easy maintenance in the future
- With UnitTest/IntegrateTest in the project, it helps developer to control critical bugs

**Other solution to improving the project**

- We can use Redis to limit daily tasks for a user and improve the performance and lessen the requests sent to database leading to considerable cost reduction
- Apply for Typescript to validate params, methods,..

**Note**

- Token will be expired after 1h, please find and copy token in this line when run first `Copy this token for unit other test:`
- Update the token into `const accessToken = token_here`
