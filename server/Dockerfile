FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript nodemon

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
