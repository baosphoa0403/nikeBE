import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (
      exception.getStatus() === HttpStatus.UNAUTHORIZED ||
      exception.getStatus() === HttpStatus.FORBIDDEN
    ) {
      exception.response.message =
        'You do not have permission to access this resource';
    }

    response.status(status).json({
      statusCode: status,
      name: exception.name,
      message:
        exception.response.message || exception.response || exception.message,
      timestamp: new Date().toISOString(),
      path: request ? request.url : null,
    });
  }
}
