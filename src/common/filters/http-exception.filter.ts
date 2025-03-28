import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { winstonLogger } from 'src/logger/winston.logger';

function normalizeIp(ip: string): string {
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    return '127.0.0.1';
  }

  // IPv6 → IPv4 (ex: ::ffff:192.168.0.1 → 192.168.0.1)
  if (ip.startsWith('::ffff:')) {
    return ip.replace('::ffff:', '');
  }

  return ip;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const method = request.method;
    const url = request.url;
    const body: unknown = request.body;
    const forwardedFor = request.headers['x-forwarded-for'];
    const ip = normalizeIp(
      typeof forwardedFor === 'string' ? forwardedFor : request.ip,
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '서버 오류가 발생했습니다';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res: any = exception.getResponse();
      const resObj =
        typeof res === 'string'
          ? { message: res }
          : (res as {
              message: string | string[];
              error?: string;
            });

      // NestJS의 기본 HttpException 응답 형식 고려
      message = Array.isArray(resObj.message)
        ? resObj.message.join(', ')
        : resObj.message;

      error = resObj.error || exception.name;
    }

    // ✅ 에러 로그 남기기
    winstonLogger.error(
      `[${method}] ${url} - 요청 실패\n` +
        `Status: ${status}\n` +
        `Message: ${message}\n` +
        `Error: ${error}\n` +
        `IP: ${ip}\n` +
        `Body: ${JSON.stringify(body)}\n`,
    );

    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }
}
