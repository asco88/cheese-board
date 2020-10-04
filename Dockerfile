FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

VOLUME /cheese-board/config
VOLUME /cheese-board/images

RUN chown -R 1000 /cheese-board/config
RUN chmod -R 775 /cheese-board/config
RUN chmod -R g+s /cheese-board/config
RUN chown -R 1000 /cheese-board/images
RUN chmod -R 775 /cheese-board/images
RUN chmod -R g+s /cheese-board/images

CMD [ "node", "./bin/www" ]