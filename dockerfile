FROM node:lts-alpine
WORKDIR /norwor
COPY . .
RUN apk add --no-cache tzdata
RUN npm install && npm run build
EXPOSE 3000
ENV TZ=Asia/Bangkok
ENV NODE_ENV=production
ENV NUXT_ADMIN_USERNAME=admin
ENV NUXT_ADMIN_PASSWORD=admin123
ENV NUXT_DOCKER_INGEST_URI=http://nginx
ENV NUXT_PUBLIC_INGEST_SERVER=49.228.131.109:3359
CMD ["node", "./.output/server/index.mjs"]

