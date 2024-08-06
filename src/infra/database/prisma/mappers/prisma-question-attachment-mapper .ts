import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/QuestionAttachment'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    const { id, questionId } = raw

    if (!questionId) throw new Error('Invalid Attachment type.')

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityId(id),
        questionId: new UniqueEntityId(questionId),
      },
      new UniqueEntityId(id),
    )
  }
}
