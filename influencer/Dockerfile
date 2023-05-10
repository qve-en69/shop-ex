FROM node:16-alpine

WORKDIR /src/influencer
RUN apk add --no-cache git

COPY influencer/package.json package.json
COPY influencer/package-lock.json package-lock.json

RUN npm ci -q

WORKDIR /src
RUN ls
COPY common common
COPY influencer influencer

WORKDIR /src/influencer
ENV NODE_ENV production
RUN npm run init-locales
RUN npm run make-locales
RUN cp -R locales_to_copy/. locales
RUN npm run build
ENV HOST 0.0.0.0

CMD npm run start
