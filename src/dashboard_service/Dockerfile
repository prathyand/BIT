FROM node:14-alpine 

WORKDIR /dashboard_service

COPY package.json .
RUN npm install
COPY . .
CMD npm start