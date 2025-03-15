FROM mongo:7.0-jammy

WORKDIR /usr/src/configs

COPY ./docker/mongo/init.js ./init.js
COPY ./docker/mongo/setup.sh ./setup.sh
RUN chmod 600 ./setup.sh

CMD ["sh", "./setup.sh"]