########
#  dev #
########
FROM node:12-alpine as dev

ARG APP_PATH
ARG FRONTEND_PORT

WORKDIR /${APP_PATH}

COPY package.json ./

VOLUME /${APP_PATH}/src

RUN npm install

COPY tsconfig.json ./
COPY tslint.json ./
COPY .browserslistrc ./
COPY angular.json ./

# Expose the listening port of your app
EXPOSE ${FRONTEND_PORT}

CMD ["npm", "run", "start"]
