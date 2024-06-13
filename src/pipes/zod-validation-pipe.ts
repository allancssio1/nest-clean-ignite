import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schme: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schme.parse(value)
    } catch (error) {
      if (error instanceof ZodError)
        throw new BadRequestException({
          errors: fromZodError(error),
          message: 'Validation failed',
          statusCOde: 400,
        })
    }

    return value
  }
}
