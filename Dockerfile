FROM registry.dataos.io/sunnybase/javabase
ENV TIME_ZONE=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime && echo $TIME_ZONE > /etc/timezone

COPY . /usr/src/schoolpay
WORKDIR /usr/src/schoolpay

RUN mvn package 

RUN cp ./web/target/web.war /etc/tomcat-8.0.24/webapps/
