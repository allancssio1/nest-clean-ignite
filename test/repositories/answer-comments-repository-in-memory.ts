// import { PaginationParams } from '@/core/repositories/pagination-params'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { DomainEvents } from '@/core/events/domain-events'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/AnswerComment'

export class AnswerCommentsRepositoryInMemory
  implements AnswerCommentRepository
{
  items: AnswerComment[] = []
  async create(answerComment: AnswerComment) {
    await this.items.push(answerComment)
    DomainEvents.dispatchEventsForAggregate(answerComment.id)
    return answerComment
  }

  async delete(answerComments: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComments.id,
    )

    await this.items.splice(itemIndex, 1)
  }

  async findById(answerCommentsId: string) {
    const answercomments = await this.items.find(
      (item) => item.id.toValue() === answerCommentsId,
    )
    return answercomments ?? null
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = await this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  // async findBySlug(slug: string) {
  //   const answercomments = await this.items.find((item) => item.slug.value === slug)

  //   if (!answercomments) return null

  //   return answercomments
  // }
  // async findManyRecents({ page }: PaginationParams) {
  //   const answercommentss = await this.items
  //     .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  //     .slice((page - 1) * 20, page * 20)
  //   return answercommentss
  // }

  // async save(answercomments: AnswerComments) {
  //   const itemIndex = this.items.findIndex((item) => item.id === answercomments.id)

  //   this.items[itemIndex] = answercomments
  // }
}
