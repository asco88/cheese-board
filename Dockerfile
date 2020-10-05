FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

VOLUME /cheese-board/user_data
VOLUME /cheese-board/icons
VOLUME /cheese-board/wallpapers

RUN chown -R 1000 /cheese-board/user_data
RUN chmod -R 775 /cheese-board/user_data
RUN chmod -R g+s /cheese-board/user_data
RUN chown -R 1000 /cheese-board/icons
RUN chmod -R 775 /cheese-board/icons
RUN chmod -R g+s /cheese-board/icons
RUN chown -R 1000 /cheese-board/wallpapers
RUN chmod -R 775 /cheese-board/wallpapers
RUN chmod -R g+s /cheese-board/wallpapers

CMD [ "node", "./bin/www" ]