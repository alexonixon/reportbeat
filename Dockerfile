FROM node:alpine
RUN apk add --no-cache vim mc
COPY run.sh .
COPY app app
COPY database database
RUN cd /app && npm i && cd ..
RUN chmod +x run.sh

CMD ["/run.sh"]