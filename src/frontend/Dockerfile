# pull official base image
FROM node:14-alpine AS builder

# set working directory
WORKDIR /frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .

# start app
RUN npm install

# ARG GATEWAY1
# ARG GATEWAY1_PORT

# ENV GATEWAY1 $GATEWAY1
# ENV GATEWAY1_PORT $GATEWAY1_PORT

RUN npm run build

# hosting

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /frontend/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]