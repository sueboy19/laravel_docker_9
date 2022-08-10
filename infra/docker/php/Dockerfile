FROM php:8.1.8-fpm-buster
LABEL maintainer="ucan-lab <yes@u-can.pro>"
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

# timezone environment
ENV TZ=Asia/Taipei \
  # locale
  LANG=en_US.UTF-8 \
  LANGUAGE=en_US:UTF-8 \
  LC_ALL=en_US.UTF-8 \
  # composer environment
  COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer \
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
  DB_HOST=db \
  DB_PORT=3306 \
  DB_DATABASE=laravel_local \
  DB_USERNAME=phper \
  DB_PASSWORD=secret

COPY --from=composer:2.0.12 /usr/bin/composer /usr/bin/composer

RUN apt-get update
RUN apt-get -y install git curl libicu-dev libonig-dev libzip-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev libxml2-dev unzip locales opencc libopencc-dev
# RUN apt-get -y install wget gnupg lsb-release && wget https://repo.mysql.com/mysql-apt-config_0.8.15-1_all.deb -P /tmp && dpkg -i /tmp/mysql-apt-config_0.8.15-1_all.deb && apt-get update && \
RUN apt-get -y install default-mysql-client
RUN apt-get clean && rm -rf /var/lib/apt/lists/* 
RUN locale-gen en_US.UTF-8 && localedef -f UTF-8 -i en_US en_US.UTF-8 &&  mkdir /var/run/php-fpm
RUN mkdir -p /tmp/cache/views && chmod 777 -R /tmp/cache
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
  docker-php-ext-install -j$(nproc) gd && \
  docker-php-ext-install intl pdo_mysql zip bcmath exif
RUN composer config -g process-timeout 3600 && \
  composer config -g repos.packagist composer https://packagist.org 
  # && \  composer global require hirak/prestissimo # copmoser 2 don't need this plugin

RUN pecl install redis && docker-php-ext-enable redis
RUN docker-php-ext-configure pcntl --enable-pcntl && docker-php-ext-install pcntl posix

COPY ./php-fpm.d/zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf
COPY ./php.ini /usr/local/etc/php/php.ini

COPY ./opencc4php.zip /usr/local
RUN cd /usr/local && unzip opencc4php.zip && rm opencc4php.zip && cd opencc4php && phpize && \
  ./configure --with-opencc=/usr/bin/opencc --with-php-config=/usr/local/bin/php-config && \
  make && make install

WORKDIR /work/backend
