FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
USER node
ENV NODE_ENV=production
CMD ["node", "-r", "esm", "src/index.js"]