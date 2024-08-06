import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Answer } from '@/domain/forum/enterprise/entities/Answer'
import { Prisma, Answer as PrismaAnswer } from '@prisma/client'

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    const { authorId, content, createdAt, id, updatedAt, questionId } = raw
    return Answer.create(
      {
        authorId: new UniqueEntityId(authorId),
        content,
        attachments: undefined,
        createdAt,
        questionId: new UniqueEntityId(questionId),
        updatedAt: updatedAt,
      },
      new UniqueEntityId(id),
    )
  }

  static toPrisma(raw: Answer): Prisma.AnswerUncheckedCreateInput {
    const { attachments, authorId, content, id, questionId } = raw
    return {
      id: id.toString(),
      authorId: authorId.toString(),
      content,
      questionId: questionId.toString(),
    }
  }
}
