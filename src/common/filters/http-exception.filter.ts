/*
  Available built-in HTTP exceptions
  - External: BadRequestException 400 / NotFoundException 404 / ImATeapotException 418
  - Authentication: UnauthorizedException 401
  - Authorization: ForbiddenException 403
  - Internal: InternalServerErrorException 500
*/

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | { message: string | string[] };

    if (typeof error === 'string') {
      return response.status(status).json({ message: error });
    }

    return response.status(status).json({ message: error.message });
  }
}
