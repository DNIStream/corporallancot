# Node Bot Dockerfile

#---------------------
FROM node:lts-alpine3.9
WORKDIR /bot

COPY package.json /bot
COPY package-lock.json /bot

RUN set -x \
  && npm -v \
  && npm set progress=false \
  && npm install --no-progress --only=prod

RUN set -x \
  && apk add tzdata

COPY /config.json /bot
COPY /index.js /bot
COPY /app /bot/app

CMD ["npm", "run", "start:hosted"]
