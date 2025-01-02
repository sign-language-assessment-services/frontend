FROM node:18 AS build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.22-alpine
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
COPY container-scripts /scripts
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
RUN ["chmod", "+x", "/scripts/docker-entrypoint.sh"]
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
ENTRYPOINT ["/scripts/docker-entrypoint.sh"]
