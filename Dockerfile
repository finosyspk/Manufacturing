FROM node

WORKDIR /usr/app
ENV PORT=110
ENV JWT_KEY="Finosys@GLSYS123!"
ENV SecretKey="SBSFinosys2020"
ENV NODE_ENV="production"
ENV dbHost="20.195.8.140"
ENV dbPort="1533"
ENV dbUser="sa"
ENV dbPass="kfk9072p!"
dbName="SBS_DEMO"
dbName_master="SBS_MSTR"
ENV Build="2.0.0"

COPY ./package.json ./

RUN npm install

COPY ./ ./

COPY ./data-types.js ./node_modules/sequelize/lib/data-types.js

RUN mkdir uploads
RUN chmod -R 777 ./uploads

EXPOSE 110

RUN rm -f ../../bin/bash
RUN rm -f ../../bin/cat

CMD ["npm","start"]

