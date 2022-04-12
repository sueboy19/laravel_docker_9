# Nginx SSL
ooxxooxx.com.pem  
ooxxooxx.com.key  

放在這個目錄下，對應系統 /work/backend/  
ssl_certificate    /work/backend/ooxxooxx.com.pem;
ssl_certificate_key    /work/backend/ooxxooxx.com.key;

# php
執行 php artisan migrate 失敗的話，通常是忘了 php artisan config:cache
