FROM node:18-alpine

WORKDIR /usr/src/marsrover

COPY ./package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
