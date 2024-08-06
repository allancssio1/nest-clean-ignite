import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { AnswerComment } from '@/domain/forum/enterprise/entities/AnswerComment'
import { Prisma, Comment as PrismaComment } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment): AnswerComment {
    const { authorId, content, createdAt, id, updatedAt, answerId } = raw

    if (!answerId) throw new Error('Invalid comment type.')

    return AnswerComment.create(
      {
        authorId: new UniqueEntityId(authorId),
        answerId: new UniqueEntityId(answerId),
        content,
        createdAt,
        updatedAt,
      },
      new UniqueEntityId(id),
    )
  }

  static toPrisma(raw: AnswerComment): Prisma.CommentUncheckedCreateInput {
    const { authorId, content, id, answerId, createdAt, updatedAt } = raw
    return {
      id: id.toString(),
      authorId: authorId.toString(),
      content,
      answerId: answerId.toString(),
      createdAt,
      updatedAt,
    }
  }
}
