FROM node:lts-alpine
WORKDIR /norwor
COPY . .
RUN apk add --no-cache tzdata
# RUN npm install && npm run build
RUN npm install
EXPOSE 3000
ENV TZ=Asia/Bangkok
# ENV NODE_ENV=production
ENV ADMIN_USERNAME=admin
ENV ADMIN_PASSWORD=admin123
ENV DOCKER_INGEST_URI=http://nginx
ENV INGEST_SERVER=49.228.131.109:3359
# CMD ["node", "./.output/server/index.mjs"]
CMD ["npm", "run", "dev"]
