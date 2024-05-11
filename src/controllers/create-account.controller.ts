import { ConflictException, UsePipes } from '@nestjs/common'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { PrismaService } from '@/prisma/pisma.services'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { email, name, password } = createAccountBodySchema.parse(body)

    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { email },
    })

    if (userAlreadyExists)
      throw new ConflictException('user already exists with email equal')

    const password_hash = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        email,
        name,
        password: password_hash,
      },
    })
  }
}
