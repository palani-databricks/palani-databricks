FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./
RUN npm config rm proxy 
RUN npm config rm https-proxy --tried removing npm proxy 
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
