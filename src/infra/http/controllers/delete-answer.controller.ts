import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeleteAnswerUseCase } from '@/domain/forum/application/useCases/delete-answer'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: DeleteAnswerUseCase) {}

  @Delete()
  @HttpCode(200)
  async handle(
    @Param('id') answerId: string,
    @CurrentUser()
    user: UserPayload,
  ) {
    const userId = user.sub
    console.log('1', answerId)
    const result = await this.deleteAnswer.execute({
      authorId: userId,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
