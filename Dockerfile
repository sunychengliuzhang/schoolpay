FROM registry.dataos.io/sunnybase/javabase

COPY . /usr/src/schoolpay
WORKDIR /usr/src/schoolpay

RUN mvn package 

RUN cp ./web/target/web.war /etc/tomcat-8.0.24/webapps/
