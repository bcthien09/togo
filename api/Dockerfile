FROM node:16-alpine

WORKDIR /var/www/html/api

COPY package*.json ./

RUN yarn

COPY . .

CMD ["yarn", "start:dev"]

