FROM node:18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN npm install -g pnpm

COPY . /usr/src/app

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]