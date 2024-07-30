import {
  ConflictException,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { compare } from 'bcryptjs'
import { z } from 'zod'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/database/prisma/pisma.services'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/useCases/authenticate-student'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/session')
export class AuthenticateController {
  constructor(private authStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authStudent.execute({ email, password })

    if (result.isLeft()) throw new Error()

    const { access_token } = result.value

    return { access_token }
  }
}
