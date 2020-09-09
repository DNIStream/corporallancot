# Node Bot Dockerfile

#---------------------
FROM node:lts-alpine3.9 as build
WORKDIR /bot

COPY package.json .
COPY package-lock.json .

RUN set -x \
  && npm -v \
  && npm set progress=false \
  && npm install --no-progress

COPY tsconfig.json .
COPY index.ts .
COPY app/ ./app

RUN ls -la

RUN set -x \
  && npm run tsc

FROM node:lts-alpine3.9 as host
WORKDIR /bot
COPY --from=build /bot/package.json .
COPY --from=build /bot/package-lock.json .
# TODO: Only copy .js files in PROD builds (ignore .ts and .map)
COPY --from=build /bot/dist .
RUN ls -la

# TODO: Make sure we need the node_modules directory after upgrading to TS
RUN set -x \
  && npm -v \
  && npm set progress=false \
  && npm install --no-progress --only=prod

RUN rm package-lock.json -f

RUN set -x \
  && apk add tzdata

RUN ls -la
COPY /config.json /bot

CMD ["npm", "run", "start:hosted"]
