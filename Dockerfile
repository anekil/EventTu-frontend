FROM node:16-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# You can add other commands and steps to build your React Native app
# For example, if you are using Expo:
# RUN npm install -g expo-cli
# RUN expo build:web

CMD ["npm", "start"]
