import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: any) {
    super();
  }
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    return response.status(400).send({
      statusCode: 400,
      success: false,
      message: exception.message,
      error: exception.validationErrors,
    });
  }
}
