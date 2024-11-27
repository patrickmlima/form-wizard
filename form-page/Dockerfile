FROM node:22-alpine AS lib-build

WORKDIR /app
COPY ../slight-form-wizard .
RUN npm install
RUN npm run build
RUN npm pack

FROM node:22-alpine AS build

WORKDIR /app
COPY form-page/package*.json ./
RUN mkdir -p ../slight-form-wizard
COPY --from=lib-build /app/*.tgz ../slight-form-wizard/

RUN npm install ../slight-form-wizard/*.tgz
RUN npm install

COPY form-page/ .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
