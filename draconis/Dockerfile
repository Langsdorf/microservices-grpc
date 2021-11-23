FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install -g typescript ts-node

CMD [ "npm", "run", "dev" ]

EXPOSE 50052