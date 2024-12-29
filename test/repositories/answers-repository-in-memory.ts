import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/Answer'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepositoryInMemory } from './answers-attachments-repository-in-memory'
import { DomainEvents } from '@/core/events/domain-events'

export class AnswersRepositoryInMemory implements AnswerRepository {
  constructor(
    private answerAttachmentRepository: AnswerAttachmentsRepositoryInMemory,
  ) {}

  items: Answer[] = []
  async create(answer: Answer): Promise<Answer> {
    await this.items.push(answer)
    await this.answerAttachmentRepository.createMany(
      answer.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)

    return answer
  }

  async findById(id: string) {
    const answer = await this.items.find((item) => item.id.toValue() === id)

    if (!answer) return null

    return answer
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    await this.answerAttachmentRepository.deleteByAnswerId(answer.id.toString())

    await this.items.splice(itemIndex, 1)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    await this.answerAttachmentRepository.createMany(
      answer.attachments.getNewItems(),
    )
    await this.answerAttachmentRepository.deleteMany(
      answer.attachments.getRemovedItems(),
    )

    this.items[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const ansewrs = await this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return ansewrs
  }
}
