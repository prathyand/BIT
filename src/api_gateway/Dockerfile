FROM node:alpine
WORKDIR /api_gateway
COPY package.json .
RUN npm install
COPY . .
CMD npm start