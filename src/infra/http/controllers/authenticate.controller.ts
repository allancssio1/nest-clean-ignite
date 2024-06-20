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

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/session')
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const passwordConfirm = await compare(password, user.password)

    if (!user) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const access_token = this.jwt.sign({
      sub: user.id,
    })
    return { access_token }
  }
}
