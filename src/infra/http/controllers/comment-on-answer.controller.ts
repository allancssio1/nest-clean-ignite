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

const commentAnswerBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(commentAnswerBodySchema)

type CommentAnswerBodySchema = z.infer<typeof commentAnswerBodySchema>

@Controller('/answers/:answerId/comments')
export class CommentAnswerController {
  constructor(private commentAnswer: CommentOnAnswerUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentAnswerBodySchema,
    @Param('answerId') answerId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.commentAnswer.execute({
      content,
      authorId: userId,
      answerId
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
