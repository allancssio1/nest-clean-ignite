import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/pisma.services'

const pageQueryParamsSchema = z
  .string()
  .optional() //params optional
  .default('1') //if don't send use number 1
  .transform(Number) //convert value in number
  .pipe(z.number().min(1)) //validation is number and min exixts

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)
type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const perPage = 20
    const questions = await this.prisma.question.findMany({
      take: perPage, //amount items
      skip: (page - 1) * perPage, // quantity of items to pass without return/96
      orderBy: { createdAt: 'desc' },
    })

    return { questions }
  }
}
