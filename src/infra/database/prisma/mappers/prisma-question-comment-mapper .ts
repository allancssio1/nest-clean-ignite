import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionComment } from '@/domain/forum/enterprise/entities/QuestionComment'
import { Prisma, Comment as PrismaQuestionComment } from '@prisma/client'

export class PrismaQuestionCommentCommentMapper {
  static toDomain(raw: PrismaQuestionComment): QuestionComment {
    const { id, questionId, authorId, content, createdAt, updatedAt } = raw

    if (!questionId) throw new Error('Invalid comment type.')

    return QuestionComment.create(
      {
        authorId: new UniqueEntityId(authorId),
        content,
        questionId: new UniqueEntityId(questionId),
        createdAt,
        updatedAt,
      },
      new UniqueEntityId(id),
    )
  }

  static toPrisma(raw: QuestionComment): Prisma.CommentUncheckedCreateInput {
    const { authorId, content, createdAt, id, questionId, updatedAt } = raw
    return {
      id: id.toString(),
      authorId: authorId.toString(),
      questionId: questionId.toString(),
      content,
      createdAt,
      updatedAt,
    }
  }
}
