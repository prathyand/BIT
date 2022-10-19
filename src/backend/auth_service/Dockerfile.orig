FROM node:14-alpine 

WORKDIR /auth_service

COPY package.json .
RUN npm install
COPY . .
CMD npm start