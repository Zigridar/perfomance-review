FROM node:14-alpine
COPY . ./app
RUN cd ./app && npm i && npm run build && npm prune --production
EXPOSE 8080
CMD cd ./app && node ./dist/app.js
