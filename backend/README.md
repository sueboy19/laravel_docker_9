# Nginx SSL
ooxxooxx.com.pem  
ooxxooxx.com.key  

放在這個目錄下 backend/ 對應系統 /work/backend/  
ssl_certificate    /work/backend/ooxxooxx.com.pem;  
ssl_certificate_key    /work/backend/ooxxooxx.com.key;  

# php
執行 php artisan migrate 失敗的話，通常是忘了 php artisan config:cache  


## php Dotenv
務必使用，因為下面 Kernel.php 會依照 env.mariab.local.env 中 APP_ENV 的參數來決定，實際載入 .env.{{  }}.env 檔案  

```php
env.mariadb.local.env
APP_ENV = local => .env.local.env

env.mariadb.staging.env
APP_ENV = staging => .env.staging.env

env.mariadb.production.env
APP_ENV = production => .env.production.env
```

實際情況依需求決定，可以不要使用 Dotenv 和 改 Kernel

## php Laravel backend/app/Http/Kernel.php

```php
namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Routing\Router;
use Dotenv\Dotenv;

class Kernel extends HttpKernel
{
    public function __construct(Application $app, Router $router)
    {
        parent::__construct($app, $router);
        
        $environmentPath = __DIR__.'/../../';

        $dotenv = Dotenv::createUnsafeImmutable($environmentPath, '.env'); // getenv not thread safe
        $dotenv->safeLoad(); //this is important
        
        $dotenv = Dotenv::createUnsafeImmutable($environmentPath, '.env.'.getenv('APP_ENV').'.env'); // getenv not thread safe
        $dotenv->safeLoad(); //this is important
    }

```

## php Laravel backend/app/ .env .env.local.env 需要建立
.env.staging.env .env.production.env 依需求建立  


