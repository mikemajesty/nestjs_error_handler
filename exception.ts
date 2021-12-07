import { HttpException, HttpStatus } from '@nestjs/common';

export type ErrorModel = {
  error: {
    code: string | number | undefined;
    traceId: string | undefined;
    message: string;
    timestamp: string;
    path: string;
  };
};

export class ApiException extends HttpException {
  context: string | undefined;
  uuid: string | undefined;
  statusCode: number | undefined;
  code?: string;
  config?: unknown;

  constructor(error: string, status?: HttpStatus, context?: string) {
    super(error, status || 500);
    this.statusCode = super.getStatus();
    if (context) {
      this.context = context;
    }
  }
}
