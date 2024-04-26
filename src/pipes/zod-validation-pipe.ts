import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common'
import { ZodError, ZodObject } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { ConfigModule } from '@nestjs/config'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schme: ZodObject<any>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schme.parse(value)
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
