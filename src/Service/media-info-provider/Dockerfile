FROM node

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm install --silent

ENTRYPOINT ["npm", "run", "dev"]