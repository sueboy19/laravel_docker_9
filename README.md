# laravel_docker

## 時區
zh-tw
## mysql
[DB 相關設定 User 和 PASSWORD](infra/docker/mysql/Dockerfile) 需要自行替換 

## 特別注意：env_file 內容需要依照實際Deploy情況選擇對應的檔案　
- [env.mariadb.local.env](./env.mariadb.local.env)
- [env.mariadb.staging.env](./env.mariadb.staging.env)
- [env.mariadb.production.env](./env.mariadb.production.env)
## nginx ssl cert
[ooxxooxx.com](infra/docker/nginx/default.conf) 需要自行替換 

## php 
[PHP 相關設定](infra/docker/php/Dockerfile) 可以自行替換
注意下半斷，apt-get install　部份

## 額外插件
OpenCC

## Queue
[Queue Worker](infra/docker/queue/supervisord.d/laravel-worker.conf) 可以自行替換


## Cron
[Cron](infra/docker/cron/crontab) 可以自行替換  

app/Console/Kernel.php

```php
protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();

        $fileCronLog = '/var/log/laravel-scheduler.log';  // dockerfile RUN ln -sf /proc/1/fd/1 /var/log/laravel-scheduler.log

        $schedule->command('your command')->timezone(config('app.timezone'))
        ->everyMinute()  // 自行替換   // cron('* * * * *')
        ->onOneServer()  
            ->before(function () {
                Log::info("Schedule your command before!");
            })
            ->after(function () {
                Log::info("Schedule your command after!");
            })
            ->onSuccess(function (Stringable $output) {
                Log::info("Schedule your command onSuccess!");
            })
            ->onFailure(function (Stringable $output) {
                Log::error("Schedule your command onFailure!");
            })
            ->appendOutputTo($fileCronLog);
```

執行無反應時，需要到 /work/backend/storage/logs/laravel.log 閱讀錯誤訊息
