FROM node:16 

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD npm start

#docker-compose -f docker-compose.dev.yml up -d