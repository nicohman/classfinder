FROM node:lts-alpine

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 443

EXPOSE 80

CMD ["npm run build"]

CMD ["npm", "start"]
