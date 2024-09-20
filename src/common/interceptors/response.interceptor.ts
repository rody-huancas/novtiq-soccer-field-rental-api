import { format } from 'date-fns';
import { Reflector } from '@nestjs/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus, } from '@nestjs/common';

export const RESPONSE_MESSAGE_METADATA = 'responseMessage';

export type Response<T> = {
  data      : T;
  message   : string;
  path      : string;
  status    : boolean;
  statusCode: number;
  timestamp : string;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext,next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => throwError(() => this.errorHandler(err, context))),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx      = context.switchToHttp();
    const response = ctx.getResponse();
    const request  = ctx.getRequest();

    const status   = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      status    : false,
      statusCode: status,
      path      : request.url,
      message   : exception.message,
      result    : exception,
      timestamp : format(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss'),
    });
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx        = context.switchToHttp();
    const response   = ctx.getResponse();
    const request    = ctx.getRequest();
    const status     = response.statusCode;
    const message    = this.reflector.get<string>(RESPONSE_MESSAGE_METADATA, context.getHandler()) || 'success';

    return {
      status    : true,
      path      : request.url,
      message   : message,
      statusCode: status,
      data      : res,
      timestamp : format(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss'),
    };
  }
}
