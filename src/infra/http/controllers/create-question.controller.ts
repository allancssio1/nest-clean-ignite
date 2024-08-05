import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { CreateQuestionUseCase } from '@/domain/forum/application/useCases/create-question'
// import { NestCreateQuestionUseCase } from '@/infra/factore-use-cases/nest-create-question-use-case'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
export class CreateQuestionController {
  // constructor(private createQuestion: NestCreateQuestionUseCase) {}
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { content, title } = body
    const userId = user.sub

    const result = await this.createQuestion.execute({
      attachmentsIds: [],
      authorId: userId,
      content,
      title,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
