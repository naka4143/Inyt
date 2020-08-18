FROM node:latest
WORKDIR /home/bot

COPY package.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
