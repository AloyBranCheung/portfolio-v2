FROM node:lts

WORKDIR /app
COPY frontend/package*.json ./
COPY package-lock.json ./
RUN npm install
COPY frontend/ . 
EXPOSE 3000
CMD ["npm", "run", "dev"]