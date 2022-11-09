import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

interface IRequest extends Request {
  user?: { id: number };
}

const logger = new Logger('HTTP');

export function HttpLoggerMiddleware(req: IRequest, res: Response, next: NextFunction) {
  const startTime = Date.now();

  res.on('finish', () => {
    const userIp = req.ips.length ? req.ips[0] : req.ip;
    const userId = req.user?.id ? ` ${req.user?.id} ` : ' ';
    const contentLength = res.getHeader('content-length') || 0;
    const referrer = req.header('Referer') || req.header('Referrer');
    const formattedReferrer = referrer ? ` "${referrer}" ` : ' ';
    const userAgent = req.header('user-agent');
    const responseTime = Date.now() - startTime;

    const message = `${userIp} -${userId}"${req.method} ${req.originalUrl} HTTP/${req.httpVersion}" ${res.statusCode} - ${contentLength}${formattedReferrer}"${userAgent}" \x1b[33m+${responseTime}ms`;

    if (res.statusCode >= 400) {
      logger.error(message);
    } else {
      logger.log(message);
    }
  });

  next();
}
