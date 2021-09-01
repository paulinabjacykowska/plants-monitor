FROM node:15-alpine

WORKDIR /sensor

COPY package*.json ./

RUN npm install

COPY src/ tsconfig*.json ./

CMD ["npm", "run", "start"]
