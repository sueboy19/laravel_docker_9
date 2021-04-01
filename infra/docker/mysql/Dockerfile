FROM mariadb:10.5.9

ENV TZ=Asia/Taipei \
  MYSQL_DATABASE=laravel_local \
  MYSQL_USER=phper \
  MYSQL_PASSWORD=secret \
  MYSQL_ROOT_PASSWORD=secret

# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime &&  echo $TZ > /etc/timezone
COPY ./my.cnf /etc/mysql/my.cnf
