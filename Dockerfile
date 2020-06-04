FROM node:12
EXPOSE 3001
WORKDIR /app
COPY package.json .
RUN npm install && npm cache clean --force
COPY . .
CMD ["npm", "run", "start"]