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