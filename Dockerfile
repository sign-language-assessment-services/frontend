FROM node:14 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY src ./src
COPY public ./public
COPY tsconfig.json ./
RUN yarn build

FROM nginx:1.17-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
