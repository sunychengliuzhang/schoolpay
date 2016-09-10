FROM guligo/jdk-maven-ant-tomcat

COPY . /usr/src/schoolpay
WORKDIR /usr/src/schoolpay

RUN mvn install -D maven.test.skip=true

RUN cp ./web/target/web.war /etc/tomcat-8.0.24/webapps/
