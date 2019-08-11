FROM node:8.0

WORKDIR /app

COPY package*.json ./ 

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]

# deploy file
# FROM alpine:latest
# RUN apk add --no-cache nodejs npm

# WORKDIR /app

# COPY . /app

# RUN npm install

# EXPOSE 9005

# ENTRYPOINT ["node"]

# CMD ["server.js"]