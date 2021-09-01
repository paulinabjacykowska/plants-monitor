FROM node:15-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

ARG REACT_APP_IP_ADDRESS

ENV REACT_APP_IP_ADDRESS $REACT_APP_IP_ADDRESS

COPY . ./

CMD ["npm", "run", "start"]
