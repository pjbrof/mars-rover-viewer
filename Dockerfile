FROM node:16-alpine

WORKDIR /usr/src/marsrover/client

# Front End

COPY ./client/package*.json ./

RUN npm install

COPY ./client ./

RUN npm run build

# Back End

WORKDIR /usr/src/marsrover

COPY ./server/package*.json ./

RUN npm install

COPY ./server ./

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
