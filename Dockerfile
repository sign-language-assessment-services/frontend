FROM node:18 as build-deps
ARG ENVIRONMENT=production
ARG AUTH_ENABLED
ENV VITE_AUTH_ENABLED=$AUTH_ENABLED
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --mode $ENVIRONMENT

FROM nginx:1.22-alpine
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
