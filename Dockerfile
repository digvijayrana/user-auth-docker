FROM node:14
WORKDIR /index
COPY package.json /index
RUN npm install
COPY . /index
CMD node --max-old-space-size=4096 index.js



