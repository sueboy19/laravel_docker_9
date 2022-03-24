FROM php:8.0.11-fpm-buster
LABEL maintainer="ucan-lab <yes@u-can.pro>"
#SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

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
  # SESSION_DRIVER=cookie \
  LOG_CHANNEL=stderr \
  DB_CONNECTION=mysql \
  DB_PORT=3306 

RUN apt-get update
RUN apt-get -y install locales libicu-dev libzip-dev htop cron nano dos2unix
RUN apt-get -y install default-mysql-client

RUN locale-gen en_US.UTF-8 && localedef -f UTF-8 -i en_US en_US.UTF-8
RUN docker-php-ext-install intl pdo_mysql zip bcmath exif

RUN apt-get clean && rm -rf /var/lib/apt/lists/* 

# 自訂
RUN mkdir -p /tmp/cache
WORKDIR /work/backend


# 這行超級重要 把初始環境的變數寫死
RUN printenv > /etc/environment


#ADD crontab /var/spool/cron/crontabs/root
#RUN chown root:crontab /var/spool/cron/crontabs/root
#RUN chmod 0600 /var/spool/cron/crontabs/root

#RUN crontab -l | { cat; echo "* * * * * . /usr/local/bin/php /work/backend/artisan config:cache && php artisan schedule:run >> /var/log/cron.log 2>&1"; } | crontab -
#RUN crontab -l | { cat; echo "* * * * * date >> /var/log/cron.log"; } | crontab -
#RUN crontab -l | { cat; echo "* * * * * echo hello > /proc/1/fd/1 2>/proc/1/fd/2"; } | crontab -


COPY crontab /etc/cron.d/crontab
# https://tech.uccu.website/convert-shell-file-end-of-line-sequence-at-dockerfile.html
RUN dos2unix /etc/cron.d/crontab
RUN chmod 0644 /etc/cron.d/crontab
RUN crontab /etc/cron.d/crontab

# 把log 輸出到 docker 上
RUN ln -sf /proc/1/fd/1 /var/log/laravel-scheduler.log

CMD bash -c "/usr/local/bin/php /work/backend/artisan config:cache && cron -f"
#CMD cron -f
