import { CommentOnAnswerUseCase } from '@/domain/forum/application/useCases/comment-on-answer'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/useCases/comment-on-question'

const commentQuestionBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(commentQuestionBodySchema)

type CommentQuestionBodySchema = z.infer<typeof commentQuestionBodySchema>

@Controller('/questions/:questionId/comments')
export class CommentQuestionController {
  constructor(private commentQuestion: CommentOnQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentQuestionBodySchema,
    @Param('questionId') questionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.commentQuestion.execute({
      content,
      authorId: userId,
      questionId
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
