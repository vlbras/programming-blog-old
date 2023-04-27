# build
FROM node:16.14 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

# prod
FROM node:16.14
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN yarn --only=production
RUN rm package*.json
EXPOSE 3000
CMD ["node", "dist/main.js"]