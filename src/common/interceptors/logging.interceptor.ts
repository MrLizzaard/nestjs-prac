import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { winstonLogger } from 'src/logger/winston.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url, query } = req;
    const body: unknown = req.body;
    const now = Date.now();

    const logData =
      method === 'POST' || method === 'PUT'
        ? ` - body: ${JSON.stringify(body)}`
        : ` - query: ${JSON.stringify(query)}`;

    winstonLogger.info(`[${method}] ${url} - 요청 시작${logData}`, {
      body,
      query,
    });

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - now;
        winstonLogger.info(`[${method}] ${url} - 요청 완료 (${time}ms)`);
      }),
    );
  }
}
