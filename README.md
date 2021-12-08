### NestJs Error Handler

## Installation
```bash
$ npm i -S nestjs-error-handler
```


## Usage

 - Add your timezone on .env
  ```bash
  -- .env
   TZ='America/Sao_Paulo'
  ```
   - Create a JSON file that represent the error that was visible in the client, the original error will be only on console
  ```json
   <!-- htttp-status.json -->
   {
      "ECONNREFUSED": "Connection Refused",
      "400": "Bad Request",
      "401": "Unauthorized",
      "403": "Forbidden",
      "404": "Not Found",
      "405": "Method Not Allowed",
      "406": "Not Acceptable",
      "408": "Request Timeout",
      "413": "Payload Too Large",
      "414": "URI Too Long",
      "422": "Unprocessable Entity",
      "428": "Precondition Required",
      "429": "Too Many Requests",
      "500": "Internal Server Error",
      "501": "Not Implemented",
      "502": "Bad Gateway",
      "503": "Service Unavailable",
      "504": "Gateway Timeout",
      "507": "Insufficient Storage",
      "508": "Loop Detected"
   }
  <!--If your error is not mapped here the original error will be displayed in the client.-->
  ```
   
   - Add on main.ts file
```js
//  main.ts
import { AppExceptionFilter, ExceptionInterceptor } from 'nestjs-error-handler';
import * as htttpStatus from './htttp-status.json';

async function bootstrap() {
 const app = await NestFactory.create(MainModule);

 app.useGlobalFilters(new AppExceptionFilter(loggerService, htttpStatus, process.env.TZ));
 app.useGlobalInterceptors(new ExceptionInterceptor());
  ...
}
```

  - Custom error
  ```js
    import { ApiException } from 'nestjs-error-handler';
  
    @Controller()
    export class HealthController {
      constructor(private readonly healthService: IHealthService) {}
    
      @Get('/health')
      async getHealth(): Promise<string> {
        throw new ApiException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  ```
##### Now all exceptions will be handler.

---

The following is a list of all the people that have contributed to nest-boilerplate. Thanks for your contributions!

[<img alt="mikemajesty" src="https://avatars1.githubusercontent.com/u/11630212?s=460&v=4&s=117" width="117">](https://github.com/mikemajesty)

## License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
