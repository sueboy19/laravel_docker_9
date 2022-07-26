FROM php:8.0.3-fpm-buster
LABEL maintainer="ucan-lab <yes@u-can.pro>"
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

# timezone environment
ENV TZ=Asia/Taipei \
  # locale
  LANG=en_US.UTF-8 \
  LANGUAGE=en_US:UTF-8 \
  LC_ALL=en_US.UTF-8 \
  # Laravel environment
  APP_SERVICES_CACHE=/tmp/cache/services.php \
  APP_PACKAGES_CACHE=/tmp/cache/packages.php \
  APP_CONFIG_CACHE=/tmp/cache/config.php \
  APP_ROUTES_CACHE=/tmp/cache/routes.php \
  APP_EVENTS_CACHE=/tmp/cache/events.php \
  VIEW_COMPILED_PATH=/tmp/cache/views \
  SESSION_DRIVER=cookie \
  LOG_CHANNEL=stderr \
  DB_CONNECTION=mysql \
  DB_PORT=3306 

# RUN apt-get update
# 移除確定不需要的安裝
RUN apt-get update && apt-get -y install curl libicu-dev libonig-dev libzip-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev libxml2-dev unzip locales 
RUN apt-get -y install default-mysql-client
# 跟 app 不一樣的地方
RUN apt-get -y install htop supervisor

RUN locale-gen en_US.UTF-8 && localedef -f UTF-8 -i en_US en_US.UTF-8
RUN docker-php-ext-install intl pdo_mysql zip bcmath exif
# 跟 app 不一樣的地方
RUN docker-php-ext-install soap

RUN apt-get clean && rm -rf /var/lib/apt/lists/* 

# 自訂
RUN mkdir -p /tmp/cache
WORKDIR /

COPY supervisord.conf /etc/supervisord.conf
COPY supervisord.d/laravel-worker.conf /etc/supervisord.d/laravel-worker.conf


ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisord.conf"]
