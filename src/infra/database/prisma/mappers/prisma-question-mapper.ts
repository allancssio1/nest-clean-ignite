import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Attachment } from '@/domain/forum/enterprise/entities/Attachment'
import { Question } from '@/domain/forum/enterprise/entities/Question'
import { Slug } from '@/domain/forum/enterprise/entities/valueObjects/Slug'
import { Prisma, Question as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    const {
      authorId,
      content,
      createdAt,
      id,
      slug,
      title,
      updatedAt,
      bestAnswerId,
    } = raw
    return Question.create(
      {
        authorId: new UniqueEntityId(authorId),
        content,
        title,
        slug: Slug.create(slug),
        bestAnswerId: bestAnswerId ? new UniqueEntityId(bestAnswerId) : null,
        attachments: undefined,
        createdAt,
        updatedAt,
      },
      new UniqueEntityId(id),
    )
  }

  static toPrisma(raw: Question): Prisma.QuestionUncheckedCreateInput {
    const { authorId, bestAnswerId, content, createdAt, id, slug, title } = raw
    return {
      id: id.toString(),
      bestAnswerId: bestAnswerId?.toString(),
      authorId: authorId.toString(),
      content,
      createdAt,
      slug: slug.value,
      title,
    }
  }
}
