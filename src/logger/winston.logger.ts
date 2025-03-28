import * as winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(
  ({
    level,
    message,
    timestamp,
  }: {
    level: string;
    message: string;
    timestamp: string;
  }) => {
    return `[${level}] ${timestamp} - ${message}`;
  },
);

export const winstonLogger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 👈 이걸 먼저!
    logFormat, // 👈 그 다음에!
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '14d',
    }),
    // 에러 전용 로그 파일
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '14d',
      level: 'error', // 👈 여기 중요!
    }),
  ],
});
