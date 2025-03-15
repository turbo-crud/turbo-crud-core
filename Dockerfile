FROM node:23 as BUILDER

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN ls -la /usr/src/app
RUN git config --system url."https://github".insteadOf "git://github"
RUN npm install

CMD ["npm", "run", "start"]