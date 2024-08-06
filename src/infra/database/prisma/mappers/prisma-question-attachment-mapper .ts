import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/QuestionAttachment'
import { Comment as PrismaAttachment } from '@prisma/client'

export class PrismaQuestionCommentCommentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    const { id, questionId } = raw

    if (!questionId) throw new Error('Invalid comment type.')

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityId(id),
        questionId: new UniqueEntityId(questionId),
      },
      new UniqueEntityId(id),
    )
  }
}
