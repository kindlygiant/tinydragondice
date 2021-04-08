FROM ubuntu:latest AS build

ENV TZ=US
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && \
    apt-get install -y git && \
    apt-get install -y nodejs && \
    apt-get install -y npm

RUN git clone https://github.com/kindlygiant/tinydragondice.git
WORKDIR /tinydragondice
RUN npm install
RUN npm run build

FROM httpd:2.4
COPY --from=build /tinydragondice/build/ /usr/local/apache2/htdocs/
