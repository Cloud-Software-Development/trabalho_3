FROM node:lts

WORKDIR /usr/frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "serve", "-s", "build", "-l", "8080" ]
