import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Attachment } from '@/domain/forum/enterprise/entities/Attachment'
import { Question } from '@/domain/forum/enterprise/entities/Question'
import { Slug } from '@/domain/forum/enterprise/entities/valueObjects/Slug'
import { Question as PrismaQuestion } from '@prisma/client'

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

  // static toPrisma(raw: Question): PrismaQuestion {
  //   const {
  //     attachments,
  //     authorId,
  //     bestAnswerId,
  //     content,
  //     createdAt,
  //     id,
  //     slug,
  //     title,
  //     updatedAt,
  //   } = raw
  //   return {
  //     authorId: authorId.toString(),
  //     content,
  //     createdAt,
  //     id: id.toString(),
  //     slug: slug.value,
  //     title,
  //     updatedAt
  //   }
  // }
}
