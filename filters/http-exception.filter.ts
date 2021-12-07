import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common';
import moment from 'moment-timezone';

import { ApiException, ErrorModel } from '../exception';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private tz: string;
  private errorFile: any;
  constructor(private readonly loggerService: LoggerService, errorFile: any = {}, tz: string) {
    this.tz = tz;
    this.errorFile = errorFile;
  }

  catch(exception: ApiException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    this.loggerService.error(exception);

    const code = [exception.code, status, HttpStatus.INTERNAL_SERVER_ERROR].find((c) => c);

    const error: ErrorModel = {
      error: {
        code,
        traceId: exception.uuid,
        message: this.errorFile[String(code)] || exception.message,
        timestamp: moment(new Date()).tz(this.tz).format(),
        path: request.url,
      },
    };

    response.status(status).json(error);
  }
}
