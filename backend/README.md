# Nginx SSL
ooxxooxx.com.pem  
ooxxooxx.com.key  

放在這個目錄下，對應系統 /work/backend/  
ssl_certificate    /work/backend/ooxxooxx.com.pem;  
ssl_certificate_key    /work/backend/ooxxooxx.com.key;  

# php
執行 php artisan migrate 失敗的話，通常是忘了 php artisan config:cache  

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


