import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/Question'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { DomainEvents } from '@/core/events/domain-events'

export class QuestionsRepositoryInMemory implements QuestionsRepository {
  constructor(
    private questionAttachmentRepository: QuestionAttachmentRepository,
  ) {}

  items: Question[] = []
  async create(question: Question) {
    await this.items.push(question)
    await this.questionAttachmentRepository.createMany(
      question.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(question.id)

    return question
  }

  async findBySlug(slug: string) {
    const question = await this.items.find((item) => item.slug.value === slug)

    return question ?? null
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    await this.questionAttachmentRepository.deleteByQuestionId(
      question.id.toString(),
    )

    await this.items.splice(itemIndex, 1)
  }

  async findById(questionId: string) {
    const question = await this.items.find(
      (item) => item.id.toValue() === questionId,
    )
    return question ?? null
  }

  async findManyRecents({ page }: PaginationParams) {
    const questions = await this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
    return questions
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    await this.questionAttachmentRepository.createMany(
      question.attachments.getNewItems(),
    )
    await this.questionAttachmentRepository.deleteMany(
      question.attachments.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(question.id)

    this.items[itemIndex] = question
  }
}
