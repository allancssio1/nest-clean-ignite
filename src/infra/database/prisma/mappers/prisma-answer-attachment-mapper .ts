import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/AnswerAttachment'
import { Comment as PrismaAttachment } from '@prisma/client'

export class PrismaAnswerCommentCommentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachment {
    const { id, answerId } = raw

    if (!answerId) throw new Error('Invalid comment type.')

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityId(id),
        answerId: new UniqueEntityId(answerId),
      },
      new UniqueEntityId(id),
    )
  }
}
