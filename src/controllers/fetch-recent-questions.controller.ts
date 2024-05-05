import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/pisma.services'
import { z } from 'zod'

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
      skip: (page - perPage) * page, // quantity of items to pass without return/96
      orderBy: { createdAt: 'desc' },
    })

    return { questions }
  }
}
