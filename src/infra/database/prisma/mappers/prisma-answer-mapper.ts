import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Answer } from '@/domain/forum/enterprise/entities/Answer'
import { Prisma, Answer as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Answer {
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
