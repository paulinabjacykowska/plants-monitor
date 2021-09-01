FROM node:15-alpine

WORKDIR /management-api

COPY package*.json ./

RUN npm install

COPY src/ tsconfig*.json ./

CMD ["npm", "run", "start"]
