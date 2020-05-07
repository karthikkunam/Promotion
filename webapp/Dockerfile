# FROM node:12.16.1-alpine3.11
FROM docker.jfrog.devops.7-11.com/devops_dockerbaseimages_node12-alpine:latest
LABEL maintainer="Hari.Mukkapati@7-11.com"
WORKDIR /opt/app
COPY archive.zip .
RUN unzip ./archive.zip
COPY package.json ./dist

RUN apk --no-cache update && apk --no-cache upgrade && apk add --no-cache git g++ make linux-headers paxctl libgcc libstdc++ gnupg
RUN git config --global url.https://github.com/.insteadOf git://github.com/
RUN cd dist && npm config set registry https://jfrog.devops.7-11.com/api/npm/npm/ && npm i


# FROM node:12.16.1-alpine3.11
FROM docker.jfrog.devops.7-11.com/devops_dockerbaseimages_node12-alpine:latest
LABEL AUTHOR=Hari.Mukkapati@7-11.com
ENV PORT=5000 DEL_PKGS="libgcc libstdc++" RM_DIRS=/usr/include
WORKDIR /opt/app
# RUN apk --no-cache update && apk --no-cache upgrade && apk add --no-cache zip g++ make && cd /tmp/ && \
#     wget https://curl.haxx.se/download/curl-7.69.0.tar.gz && tar -xvzf curl-7.69.0.tar.gz && rm *.gz && \
#     ls -al && cd curl-7.69.0 && ls -al && ./configure && make && make install && which curl && curl -V  && cd / && rm -rf /tmp/* && \
#     ls -al /usr/local/lib/node_modules/ && npm -v && npm install -g npm@6.14.4 && npm -v && \
#     npm config set @7eleven:registry https://jfrog.devops.7-11.com/api/npm/npm/ && \
RUN adduser -S sevenbossspace && \
	  addgroup -S sevenbossspace && \
    chown -R sevenbossspace:sevenbossspace /opt/app && \
    apk del make gcc g++ && \
    rm -rf ${RM_DIRS} /SHASUMS256.txt /tmp/* \
    /usr/share/man/* /usr/share/doc /root/.npm /root/.node-gyp /root/.config \
    /usr/lib/node_modules/npm/man /usr/lib/node_modules/npm/doc /usr/lib/node_modules/npm/docs \
    /usr/lib/node_modules/npm/html /usr/lib/node_modules/npm/scripts && \
    { rm -rf /root/.gnupg || true; }
COPY --from=0 /opt/app/dist /opt/app/
EXPOSE 5000
CMD ["node", "/opt/app/web/server/server.js"]
